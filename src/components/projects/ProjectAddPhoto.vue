<template>
    <div class="m-2">
        <p>Презентация {{ countUploadedPhotos }} / 10</p>    </div>
    <div class="photo-upload flex w-full flex-wrap">
        <div v-for="(inputId, index) in inputIds" :key="index" class="upload-wrapper">
            <label :for="inputId"
                :class="['file-upload-label', { 'with-image': imageUrls[index], 'active': index === activeIndex }]"
                :style="{ backgroundImage: 'url(' + imageUrls[index] + ')' }">
                <input :id="inputId" type="file" @change="handleFileChange($event, index)" accept="image/*"
                    :disabled="index !== activeIndex" />
                <span class="icon" v-show="!imageUrls[index]">
                    <v-icon icon="mdi-plus" />
                </span>
            </label>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputIds: Array.from({ length: 10 }, (_, i) => `file-upload-${i}`),
            imageUrls: Array(10).fill(null),
            activeIndex: 0,
        };
    },
    computed:{
        countUploadedPhotos(){
            return this.imageUrls.filter(url =>url !=null).length
        }
    },
    methods: {
        handleFileChange(event, index) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.imageUrls[index] = reader.result; // Update the image URL at the specified index
                    this.setNextActive(index);
                };
                reader.readAsDataURL(file);
            }
        },
        setNextActive(index) {
            if (index < this.inputIds.length - 1) {
                this.activeIndex = index + 1;
            } else {
                this.activeIndex = 0;
            }
        },
    },
};
</script>


<style scoped>
.photo-upload {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 12px;
}

.upload-wrapper {
    flex-basis: calc(20% - 12px);
}

.file-upload-label {
    display: flex;
    min-width: 100%;
    min-height: 220px;
    background-color: white;
    cursor: pointer;
    padding: 10px;
    align-items: center;
    justify-content: center;
    border: 1.5px solid #E0E0E0;
    border-radius: 12px;
    margin-bottom: 10px;
    background-size: cover;
    cursor: default;
    background-position: center;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
}

@media (max-width: 576px) {
    .file-upload-label {
        min-height: 110px;
    }
}

@media (max-width: 440px) {
    .file-upload-label {
        min-height: 110px;
    }
}

@media (max-width: 380px) {
    .file-upload-label {
        min-height: 100px;
    }
}


.file-upload-label.with-image {
    min-height: 220px;
    min-width: 100%;
}

@media (max-width: 576px) {
    .file-upload-label.with-image {
        min-height: 110px;
    }
}

@media (max-width: 440px) {
    .file-upload-label.with-image {
        min-height: 110px;
    }
}

@media (max-width: 380px) {
    .file-upload-label.with-image {
        min-height: 100px;
    }
}

.file-upload-label.active {
    cursor: pointer;
}

input[type="file"] {
    display: none;
}

.icon {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
}
</style>
