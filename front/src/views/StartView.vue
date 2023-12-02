<template>
  <div>
    <div class="header clearfix">Zadzwonimy do Ciebie w ciągu 26 sekund.</div>
    <label class="form-label clearfix" for="form-number">
      Wprowadź numer
    </label>
    <div class="client-number">
      Dzisiaj obsłuzyliśmy już <b>{{ todayCalls.length }}</b> klientów.
    </div>
    <input v-model="number" class="form-number clearfix" id="form-number" />
    <div class="call-button" @click="call">Zadzwoń teraz</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: "",
      todayCalls: [],
    };
  },
  methods: {
    async call() {
      if (!/^\d{9}$/.test(this.number)) {
        alert("Please enter a valid 9-digit number.");
        return;
      }

      try {
        let responseStream = await fetch(
          `${process.env.VUE_APP_SERVER_URL}/call`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({ number: this.number }),
          }
        );

        let response = await responseStream.json();
        this.$router.push({
          name: "ringing",
          params: { callsId: response.id },
        });
      } catch (error) {
        console.error("Error calling API:", error);
        this.$router.push({ name: "failed" }); 
      }
    },
    async fetchTodayCalls() {
      try {
        let responseStream = await fetch(
          `${process.env.VUE_APP_SERVER_URL}/today-calls`
        );

        if (!responseStream.ok) {
          throw new Error(`HTTP error! status: ${responseStream.status}`);
        }

        let todayCalls = await responseStream.json();

        if (!todayCalls || todayCalls.length === 0) {
          console.log("No calls have been made today.");
          this.todayCalls = [];
        } else {
          this.todayCalls = todayCalls;
        }
      } catch (error) {
        console.error("Error fetching today's calls:", error);
      }
    },
  },
  mounted() {
    this.fetchTodayCalls(); 
  },
};
</script>
