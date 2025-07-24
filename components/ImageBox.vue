<template>
  <div
    v-if="props.isLoading"
    class="h-full flex flex-col items-center justify-center text-gray-500"
  >
    <v-progress-circular
      indeterminate
      color="primary"
      class="mx-auto mb-5"
    ></v-progress-circular>
    <p class="text-center">Loading images...</p>
  </div>

  <div
    v-else-if="props.files.length === 0"
    class="h-full flex flex-col items-center justify-center text-gray-500"
  >
    <v-icon large class="mb-2">mdi-image-off</v-icon>
    <span>No images uploaded.</span>
  </div>

  <div v-else class="h-full overflow-y-auto pr-2">
    <h2 class="text-2xl font-bold mb-5">Uploaded images</h2>
    <div class="space-y-4">
      <ImageCard
        v-for="file in props.files"
        :key="file.filename"
        class="flex items-center gap-4"
        :file="file"
        @deleted="emitDeleted"
        @duplicated="emitDuplicated"
      />
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import ImageCard from '~/components/ImageCard.vue'
import type { FileSchemaType } from '~/schema/FileSchema'

export default defineComponent({
  name: 'ImageBox',
  components: { ImageCard },
  props: {
    files: {
      type: Array as PropType<FileSchemaType[]>,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['deleted', 'duplicated'],
  setup(props, { emit }) {
    const emitDeleted = (filename: string) => {
      emit('deleted', filename)
    }

    const emitDuplicated = (filename: string) => {
      emit('duplicated', filename)
    }

    return {
      props,
      emitDeleted,
      emitDuplicated,
    }
  },
})
</script>
