<template>
  <div class="box">
    <div class="text">
      Trwa połączenie... 
      <br>
      </div>
      <div class="time">
      {{ formattedTime }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeLeft: 0,
      formattedTime: "00:00",
    };
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.timeLeft++;
        this.formatTime();
      }, 1000);
    },
    formatTime() {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      this.formattedTime = `${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
    },
    padNumber(number) {
      return number.toString().padStart(2, '0');
    },
  },
  beforeUnmount() {
    clearInterval(this.timerInterval);
  },
};
</script>
