<template>
  <div>
    <div class="header clearfix">We will call you back within 26 seconds.</div>
    <label class="form-label clearfix" for="form-number">
      Enter number
    </label>
    <div class="client-number">
      Today we have already served <b>{{ todayCalls.length }}</b> clients.
    </div>
    <input v-model="number" class="form-number clearfix" id="form-number" />
    <div class="call-button" @click="call">Call now</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: "",
      todayCalls: [],
      callStatus: null,
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
        localStorage.setItem("callInitiated", "true");
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
