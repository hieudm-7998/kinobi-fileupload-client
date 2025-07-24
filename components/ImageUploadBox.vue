<template>
  <div
    class="upload-dropzone"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @dragover.prevent="onDragOver"
    @drop.prevent="onFileDrop"
  >
    <!-- Drag Overlay -->
    <div v-if="dragActive" class="drop-overlay">
      <v-icon large color="white">mdi-cloud-upload</v-icon>
      <p class="white--text font-weight-bold text-h6 mt-2">Drop your image here</p>
    </div>

    <v-form @submit.prevent="handleUpload">
      <!-- Hidden file input -->
      <v-file-input
        ref="fileInput"
        v-model="file"
        accept="image/*"
        style="display: none"
        @change="onFileSelect"
      />

      <v-icon class="d-block mb-5" color="blue" large>mdi-file-upload</v-icon>
      <h1 class="text-center font-weight-bold text-h5 mb-3">Drag and Drop file here to upload</h1>
      <h1 class="text-center font-weight-regular text-h6 mb-3">or</h1>

      <!-- Browse button -->
      <v-btn class="d-block mx-auto mb-3" rounded color="primary" @click="triggerBrowse">
        <v-icon left>mdi-folder-open</v-icon>
        Browse
      </v-btn>

      <p class="text-center gray--text">Supported files: .jpeg, .png</p>

      <!-- Upload button -->
      <div v-if="file">
        <p class="d-block font-weight-medium text-center">{{ file.name }}</p>
        <v-btn type="submit" color="primary" class="d-block mx-auto" :loading="loading">
          <v-icon left>mdi-cloud-upload</v-icon>
          Upload
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
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
    async handleUpload() {
      if (!this.file) return;
      this.loading = true;
      const form = new FormData();
      form.append('file', this.file);

      try {
        await this.$axios.post('/upload', form);
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
  min-height: 300px;
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
