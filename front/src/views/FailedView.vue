<template>
  <div class="box">
    <div class="text">Wystąpił problem z połączeniem</div>
    <div class="call-button-bottom" @click="endCallAndNavigate">
      Spróbuj ponownie
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