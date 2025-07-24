<template>
  <div
    class="upload-dropzone"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @dragover.prevent="onDragOver"
    @drop.prevent="onFileDrop"
  >
    <div v-if="dragActive" class="drop-overlay">
      <v-icon large color="white">mdi-cloud-upload</v-icon>
      <h4 class="white--text font-weight-bold mt-2">Drop your image here</h4>
    </div>

    <v-form @submit.prevent="handleUpload">
      <v-file-input
        ref="fileInput"
        accept="image/png,image/jpeg"
        style="display: none"
        @change="handleFileInput"
      />

      <div class="text-center mb-5">
        <v-icon color="blue" large>mdi-file-upload</v-icon>
      </div>
      <h2 class="text-center text-2xl font-bold mb-5">
        Drag and drop file here to upload
      </h2>
      <h3 class="text-center mb-5">or</h3>

      <v-btn
        class="d-block mx-auto mb-5"
        rounded
        color="primary"
        @click="triggerBrowse"
      >
        <v-icon left>mdi-folder-open</v-icon>
        Browse
      </v-btn>

      <p class="text-center grey--text">Supported files: .jpg, .jpeg, .png</p>

      <div v-if="file" class="flex flex-col items-center">
        <p class="font-medium text-center line-clamp-1">{{ file.name }}</p>
        <div class="space-x-2">
          <v-btn
            type="submit"
            rounded
            color="primary"
            class="block mx-auto"
            :loading="loading"
          >
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

    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      {{ snackbar.text }}

      <template #action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { uploadFile } from '~/api/useFiles'
import { FILE_FORMATS } from '~/constant/FileFormat'

export default defineComponent({
  name: 'ImageUploadBox',
  emits: ['uploaded'],
  setup(_, { emit }) {
    const file = ref<File | null>(null)
    const loading = ref(false)
    const dragActive = ref(false)
    const fileInput = ref()
    const snackbar = ref({ show: false, text: '', color: '' })

    const triggerBrowse = () => {
      const input = fileInput.value?.$el?.querySelector('input')
      if (input) input.click()
    }

    const onFileSelect = (selectedFile: File) => {
      if (!FILE_FORMATS.includes(selectedFile.type)) {
        snackbar.value = {
          show: true,
          text: 'Only .jpg, .jpeg and .png images are allowed.',
          color: 'red',
        }
        return
      }
      file.value = selectedFile
    }

    const onDragEnter = () => {
      dragActive.value = true
    }

    const onDragLeave = (e: DragEvent) => {
      if (
        !e.relatedTarget ||
        !(e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)
      ) {
        dragActive.value = false
      }
    }

    const onDragOver = (e: DragEvent) => {
      e.dataTransfer!.dropEffect = 'copy'
    }

    const onFileDrop = (e: DragEvent) => {
      dragActive.value = false
      const droppedFiles = e.dataTransfer?.files
      if (droppedFiles && droppedFiles.length) {
        const droppedFile = droppedFiles[0]
        if (!FILE_FORMATS.includes(droppedFile.type)) {
          snackbar.value = {
            show: true,
            text: 'Only .jpg, .jpeg and .png images are allowed.',
            color: 'red',
          }
          return
        }
        file.value = droppedFile
      }
    }

    const clearFile = () => {
      file.value = null
    }

    const handleFileInput = (input: File | File[] | undefined) => {
      const selected = Array.isArray(input) ? input[0] : input

      if (!selected) return

      if (!FILE_FORMATS.includes(selected.type)) {
        snackbar.value = {
          show: true,
          text: 'Only .jpg, .jpeg and .png images are allowed.',
          color: 'red',
        }
        file.value = null
        return
      }

      file.value = selected
    }

    const handleUpload = async () => {
      if (!file.value) return

      loading.value = true
      try {
        await uploadFile(file.value)
        emit('uploaded')
        snackbar.value = {
          show: true,
          text: 'Image upload successfully.',
          color: 'green',
        }
        file.value = null
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Upload failed:', error)
      } finally {
        loading.value = false
      }
    }

    return {
      file,
      loading,
      dragActive,
      fileInput,
      triggerBrowse,
      onFileSelect,
      onDragEnter,
      onDragLeave,
      onDragOver,
      onFileDrop,
      clearFile,
      handleUpload,
      handleFileInput,
      snackbar,
    }
  },
})
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
