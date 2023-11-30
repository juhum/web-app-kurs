<template>
  <div class="window">
    <router-view />
  </div>
</template>

<style>
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    background: #fdfaf6; 
  }
  .window {
    width: 800px;
    height: 500px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background: #f9f9f9; 
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); 
    box-sizing: border-box;
    padding: 20px;
    text-align: center;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }

  .clearfix:after {
    content: "";
    clear: both;
    display: table;
  }

  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #555; 
    cursor: pointer;
    font-size: 1.15em;
  }

  .box {
    text-align: center;
  }

  .text {
    font-size: 40px;
    font-weight: bold;
    margin-top: 30px;
    color: #555; 
  }

  .header,
  .form-number {
    margin-bottom: 30px;
    color: #555; 
  }

  .header {
    margin-top: 50px;
    font-size: 38px;
    font-weight: 600;
  }

  .form-label {
    font-size: 32px;
    font-weight: 600;
    color: #777; 
  }

  .form-number {
    width: 400px;
    height: 55px;
    padding: 20px;
    box-sizing: border-box;
    font-size: 28px;
    letter-spacing: 2px;
    text-align: center;
    background: #ffffff; 
    border: 1px solid #ddd; 
  }

  .call-button,
  .call-button-bottom {
    width: 300px;
    height: 75px;
    vertical-align: middle;
    font-size: 22px;
    font-weight: 600;
    line-height: 75px;
    background: #3498db; 
    cursor: pointer;
    color: #fff;
    border-radius: 20px;
    margin: 0 auto;
  }

  .call-button-bottom {
    margin-top: 20px;
  }

  .call-button:hover {
    filter: brightness(90%);
  }

  .error {
    border: 1px solid #e74c3c; 
    background: #f9ebae; 
  }

  .time{
    font-size: 60px;
    font-weight: bold;
    margin-top: 70px;
    color: #333;
  }

  .loading {
  margin: auto;
  margin-top: 100px;
  border: 10px solid white;
  border-radius: 80%;
  border-top: 10px solid #3498db; 
  width: 80px;
  height: 80px;
  animation: spinner 3s ease-in-out infinite;
}

@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
