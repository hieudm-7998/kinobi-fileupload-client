<template>
  <v-container
    fluid
    class="fill-height d-flex flex-column justify-center align-center"
  >
    <v-card class="text-center pa-6" style="width: 100%; max-width: 1200px">
      <h2 class="text-h4 mb-4">Image Upload</h2>

      <upload-form @uploaded="fetchFiles" />

      <v-alert
        v-if="uploadSuccess"
        type="success"
        class="my-4"
        dismissible
        @input="uploadSuccess = false"
      >
        Upload successful!
      </v-alert>
    </v-card>
    <v-card v-if="files.length > 0" class="mt-6 pa-4" style="width: 100%; max-width: 1200px">
      <div class="d-flex flex-wrap justify-center">
        <uploaded-item-card
          v-for="file in files"
          :key="file"
          :item="{ filename: file }"
          class="ma-2"
        />
      </div>
    </v-card>
  </v-container>
</template>

<script>
import UploadForm from '~/components/UploadForm.vue'

export default {
  components: { UploadForm },
  data() {
    return {
      files: [],
      uploadSuccess: false,
    }
  },
  mounted() {
    this.fetchFiles()
  },
  methods: {
    async fetchFiles() {
      try {
        const res = await this.$axios.get('/files')
        this.files = res.data
      } catch (err) {
        console.error('Failed to fetch files:', err)
      }
    },
  },
}
</script>
