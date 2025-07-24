<template>
  <div class="h-screen flex flex-col item-center justify-center">
    <v-card class="p-6 mx-auto w-full" style="max-width: 1280px; height: 600px;">
      <div class="flex gap-6 h-full">
        <div class="flex-1">
          <ImageUploadBox @uploaded="refreshFiles" />
        </div>
        <div class="flex-1">
          <ImageBox :files="files" @deleted="refreshFiles" @duplicated="refreshFiles" />
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import ImageUploadBox from '~/components/ImageUploadBox.vue'
import ImageBox from '~/components/ImageBox.vue'
import { fetchFiles } from '~/api/files.js'

export default {
  components: { ImageUploadBox, ImageBox },
  data() {
    return {
      dialogOpen: false,
      files: [],
      selectedItem: {},
      uploadSuccess: false,
    }
  },
  async mounted() {
    await this.refreshFiles()
  },
  methods: {
    async refreshFiles() {
      this.files = await fetchFiles()
    },
    openDialog(item) {
      this.selectedItem = item
      this.dialogOpen = true
    },
  },
}
</script>
