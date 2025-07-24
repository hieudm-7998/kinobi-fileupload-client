<template>
  <v-container fluid class="d-flex flex-column align-center justify-center">
    <h2 class="text-h4 font-weight-bold text-center mb-4">Image Upload</h2>
    <v-card class="text-center pa-6 mx-auto" style="width: 100%; max-width: 1200px">
      <v-row>
        <v-col class="flex-grow-1">
          <ImageUploadBox @uploaded="fetchFiles" />
        </v-col>
        <v-col class="flex-grow-1">
          <div class="d-flex flex-wrap justify-center mt-6 pa-4">
            <uploaded-item-card v-for="file in files" :key="file" :item="{ filename: file }"
              @show-dialog="openDialog" />
          </div>
        </v-col>
      </v-row>
    </v-card>

    <image-detail-dialog v-model="dialogOpen" :item="selectedItem" />
  </v-container>
</template>

<script>
import ImageUploadBox from '~/components/ImageUploadBox.vue'
import ImageDetailDialog from '~/components/ImageDetailDialog.vue'

export default {
  components: { ImageUploadBox, ImageDetailDialog },
  data() {
    return {
      dialogOpen: false,
      files: [],
      selectedItem: {},
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
    openDialog(item) {
      this.selectedItem = item
      this.dialogOpen = true
    },
  },
}
</script>
