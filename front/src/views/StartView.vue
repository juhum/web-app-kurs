<template>
  <div>
    <div class="header clearfix">Zadzwonimy do Ciebie w ciągu 26 sekund.</div>
    <label class="form-label clearfix" for="form-number">
      Wprowadź numer
    </label>
    <input v-model="number" class="form-number clearfix" id="form-number" />
    <div class="call-button" @click="call">Zadzwoń teraz</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: "",
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
        this.$router.push({ name: "ringing", params: { callsId: response.id } });
      } catch (error) {
        console.error("Error calling API:", error);
        this.$router.push({ name: "failed" }); // Redirect to the "failed" route
      }
    },
  },
};
</script>
