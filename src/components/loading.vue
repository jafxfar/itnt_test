<template>
    <div>
      <div class="loader-container">
        <div class="loader" v-if="!showCheckmark"></div>
        <img src="/src/assets/LoadingIcon.svg" class="checkmark" v-if="showCheckmark" alt="Success">
      </div>
      <div class="overlay" v-if="showOverlay" :class="{ 'animate-overlay': showOverlay }"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoadingAnimation',
    data() {
      return {
        showCheckmark: false,
        showOverlay: false,
      };
    },
    mounted() {
      setTimeout(() => {
        this.showCheckmark = true;
  
        setTimeout(() => {
          this.showOverlay = true;
        }, 1000); // Delay the blue fill effect after the checkmark is shown
      }, 5000); // This timeout simulates a loading time of 5 seconds
    }
  };
  </script>
  
  <style scoped>
  body, html {
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
    overflow: hidden;
  }
  
  .loader-container {
    position: relative;
    width: 150px;
    height: 100px;
  }
  
  .loader {
    border: 10px solid #f3f3f3;
    border-top: 10px solid #3498db;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .checkmark {
    background-color: #3498db;
    padding: 12px;
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }
  
  .overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #3498db;
    z-index: 1;
    clip-path: circle(0% at 50% 50%);
    transition: clip-path 1.5s ease-out;
  }
  
  .overlay.animate-overlay {
    display: block;
    animation: fillScreenClockwise 1.5s forwards;
  }
  
  @keyframes fillScreenClockwise {
    from {
      clip-path: circle(0% at 50% 50%);
    }
    to {
      clip-path: circle(150% at 50% 50%);
    }
  }
  </style>
  