<template>
  <div class="box">
    <div class="text">Connection ended.</div>
    <div class="call-button-bottom" @click="endCallAndNavigate">End</div>
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