<!-- src/components/BoundingBox.vue -->
<template>
  <div>
    <img :src="imageUrl" @mousedown="startBoundingBox" @mouseup="endBoundingBox" />
    <div>
      <p>Coordinates: xmin: {{ coords.xmin }}, ymin: {{ coords.ymin }}, xmax: {{ coords.xmax }}, ymax: {{ coords.ymax }}</p>
    </div>
    <button @click="nextImage">Next</button>
    <button @click="saveCoordinates">Save</button>
    <button @click="resetCoordinates">Reset</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      imageUrl: "",
      imageIndex: 0,
      coords: {
        xmin: 0,
        ymin: 0,
        xmax: 0,
        ymax: 0,
      },
    };
  },
  mounted() {
    this.loadImage();
  },
  methods: {
    startBoundingBox(event) {
      this.coords.xmin = event.clientX;
      this.coords.ymin = event.clientY;
    },
    endBoundingBox(event) {
      this.coords.xmax = event.clientX;
      this.coords.ymax = event.clientY;
    },
    loadImage() {
      axios
        .get("/path/to/your/image/folder")
        .then((response) => {
          this.imageUrl = response.data[this.imageIndex];
        })
        .catch((error) => {
          console.error("Error loading image:", error);
        });
    },
    nextImage() {
      this.imageIndex++;
      this.loadImage();
    },
    saveCoordinates() {
      const fileName = this.imageUrl.substring(this.imageUrl.lastIndexOf("/") + 1) + ".txt";
      axios.post("/path/to/save/coordinates", { fileName, coords: this.coords }).then(() => {
        console.log("Coordinates saved");
      });
    },
    resetCoordinates() {
      this.coords.xmin = 0;
      this.coords.ymin = 0;
      this.coords.xmax = 0;
      this.coords.ymax = 0;
    },
  },
};
</script>
