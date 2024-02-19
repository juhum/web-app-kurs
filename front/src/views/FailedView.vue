<template>
  <div class="box">
    <div class="text">There was a problem with the connection</div>
    <div class="call-button-bottom" @click="endCallAndNavigate">
      Try again
    </div>
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