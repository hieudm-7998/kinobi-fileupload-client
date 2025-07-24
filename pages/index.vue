<template>
  <div class="h-screen flex flex-col item-center justify-center gap-6">
    <v-card class="card-container p-6 mx-auto w-full">
      <div class="flex gap-6 h-full">
        <div class="flex-1">
          <ImageUploadBox @uploaded="refreshFiles" />
        </div>
        <div class="flex-1">
          <ImageBox
            :files="files"
            :is-loading="isLoading"
            @deleted="refreshFiles"
            @duplicated="refreshFiles"
          />
        </div>
      </div>
    </v-card>
    <Credit />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import ImageUploadBox from '~/components/ImageUploadBox.vue'
import ImageBox from '~/components/ImageBox.vue'
import Credit from '~/components/Credit.vue'
import { fetchFiles } from '~/api/useFiles'
import type { FileSchemaType } from '~/schema/FileSchema'

export default defineComponent({
  name: 'IndexPage',
  components: {
    ImageUploadBox,
    ImageBox,
    Credit,
  },
  setup() {
    const files = ref<FileSchemaType[]>([])
    const isLoading = ref(true)

    const refreshFiles = async () => {
      isLoading.value = true
      const result = await fetchFiles()
      if (result) {
        files.value = result
      } else {
        files.value = []
      }
      isLoading.value = false
    }

    onMounted(() => {
      refreshFiles()
    })

    return {
      files,
      isLoading,
      refreshFiles,
    }
  },
})
</script>

<style>
.card-container {
  max-width: 1280px;
  height: 600px;
}
</style>
