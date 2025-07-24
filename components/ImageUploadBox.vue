<template>
  <div class="upload-dropzone" @dragenter="onDragEnter" @dragleave="onDragLeave" @dragover.prevent="onDragOver"
    @drop.prevent="onFileDrop">

    <div v-if="dragActive" class="drop-overlay">
      <v-icon large color="white">mdi-cloud-upload</v-icon>
      <h4 class="white--text font-weight-bold mt-2">Drop your image here</h4>
    </div>

    <v-form @submit.prevent="handleUpload">
      <v-file-input ref="fileInput" v-model="file" accept="image/png,image/jpeg" style="display: none"
        @change="onFileSelect" />

      <div class="text-center mb-5">
        <v-icon color="blue" large>mdi-file-upload</v-icon>
      </div>
      <h2 class="text-center text-2xl font-bold mb-5">Drag and drop file here to upload</h2>
      <h3 class="text-center mb-5">or</h3>

      <v-btn class="d-block mx-auto mb-5" rounded color="primary" @click="triggerBrowse">
        <v-icon left>mdi-folder-open</v-icon>
        Browse
      </v-btn>

      <p class="text-center grey--text">Supported files: .jpeg, .png</p>

      <div v-if="file" class="flex flex-col items-center">
        <p class="font-medium text-center line-clamp-1">{{ file.name }}</p>
        <div class="space-x-2">
          <v-btn type="submit" rounded color="primary" class="block mx-auto" :loading="loading">
            <v-icon left>mdi-cloud-upload</v-icon>
            Upload
          </v-btn>
          <v-btn color="red" rounded outlined @click="clearFile">
            <v-icon left>mdi-close</v-icon>
            Clear
          </v-btn>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
import { uploadFile } from '~/api/files.js'

export default {
  name: 'ImageUploadBox',
  data() {
    return {
      file: null,
      loading: false,
      dragActive: false,
    };
  },
  methods: {
    triggerBrowse() {
      this.$refs.fileInput.$el.querySelector('input').click();
    },
    onFileSelect(file) {
      this.file = file;
    },
    onDragEnter() {
      this.dragActive = true;
    },
    onDragLeave(e) {
      if (e.relatedTarget === null || !this.$el.contains(e.relatedTarget)) {
        this.dragActive = false;
      }
    },
    onDragOver(event) {
      event.dataTransfer.dropEffect = 'copy';
    },
    onFileDrop(event) {
      this.dragActive = false;
      const droppedFiles = event.dataTransfer.files;
      if (droppedFiles.length) {
        this.file = droppedFiles[0];
      }
    },
    clearFile() {
      this.file = null;
    },
    async handleUpload() {
      if (!this.file) return;
      this.loading = true;

      try {
        await uploadFile(this.file);
        this.$emit('uploaded');
        this.file = null;
      } catch (e) {
        console.error('Upload failed:', e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.upload-dropzone {
  height: 100%;
  border: 2px dashed #3a7fee;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.drop-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #3a7fee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  z-index: 10;
  pointer-events: none;
}
</style>
