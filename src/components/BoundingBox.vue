<!-- src/components/BoundingBox.vue -->
<template>
    <div>
        <label for="image-folder">Choose an image folder:</label>
        <input type="file" id="image-folder" webkitdirectory directory @change="setImageFolder($event)" />
        <br />
        <label for="save-folder">Choose a save folder:</label>
        <input type="file" id="save-folder" webkitdirectory directory @change="setSaveFolder($event)" />
        <br />

        <img :src="imageUrl" @mousedown="startBoundingBox" @mouseup="endBoundingBox" />
        <div>
            <p>Coordinates: xmin: {{ coords.xmin }}, ymin: {{ coords.ymin }}, xmax: {{ coords.xmax }}, ymax: {{ coords.ymax
            }}</p>
        </div>
        <button @click="nextImage">Next</button>
        <button @click="saveCoordinates">Save</button>
        <button @click="resetCoordinates">Reset</button>
    </div>
</template>

<script>
// import axios from "axios";

export default {
    data() {
        return {
            imageFolderPath: "",
            saveFolderPath: "",
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
        setImageFolder(event) {
            const fileList = event.target.files;
            if (fileList.length > 0) {
                const folderPath = fileList[0].webkitRelativePath.split("/")[0];
                this.imageFolderPath = folderPath;
                this.loadImage();
            }
        },
        setSaveFolder(event) {
            const fileList = event.target.files;
            if (fileList.length > 0) {
                const folderPath = fileList[0].webkitRelativePath.split("/")[0];
                this.saveFolderPath = folderPath;
            }
        },
        startBoundingBox(event) {
            this.coords.xmin = event.clientX;
            this.coords.ymin = event.clientY;
        },
        endBoundingBox(event) {
            this.coords.xmax = event.clientX;
            this.coords.ymax = event.clientY;
        },
        loadImage() {
            if (this.imageFolderPath) {

                // Load images from the local folder
                this.imageUrl = this.imageFolderPath + "/image" + this.imageIndex + ".jpg";
            }
        },
        nextImage() {
            this.imageIndex++;
            this.loadImage();
        },
        saveCoordinates() {
            if (this.saveFolderPath) {
                const fileName = this.saveFolderPath + "/" + this.imageUrl.substring(this.imageUrl.lastIndexOf("/") + 1) + ".txt";

                //  Save coordinates to a local file (this might not work in all browsers)
                const fileContent = `xmin: ${this.coords.xmin}, ymin: ${this.coords.ymin}, xmax: ${this.coords.xmax}, ymax: ${this.coords.ymax}`;
                const file = new Blob([fileContent], { type: "text/plain" });
                const url = URL.createObjectURL(file);
                const link = document.createElement("a");
                link.href = url;
                link.download = fileName;
                link.click();
                URL.revokeObjectURL(url);
            }
        },
        resetCoordinates() {
            this.coords.Fxmin = 0;
            this.coords.ymin = 0;
            this.coords.xmax = 0;
            this.coords.ymax = 0;
        },
    },
};
</script>
