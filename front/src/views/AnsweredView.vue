<template>
  <div class="box">
    <div class="text">Połączenie zakończone.</div>
    <div class="call-button-bottom" @click="endCallAndNavigate">Zakończ</div>
  </div>
</template>
<script>
export default {
  methods: {
    endCallAndNavigate() {
      localStorage.setItem("callInitiated", "false");
      this.$router.push(`/`);
    },
  },
};
</script>