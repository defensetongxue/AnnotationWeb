<!-- src/App.vue -->
<template>
    <div id="app">
      <BoundingBox />
    </div>
  </template>
  
  <script>
  import BoundingBox from "./components/BoundingBox.vue";
  
  export default {
    name: "App",
    components: {
      BoundingBox,
    },
  };
  </script>
  