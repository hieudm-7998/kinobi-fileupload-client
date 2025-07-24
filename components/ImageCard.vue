<template>
  <div
    class="flex items-center gap-4 p-4 rounded-lg border-2 border-transparent bg-white shadow hover:border-gray-100 hover:shadow-lg hover:bg-gray-50 transition-all duration-200"
  >
    <div class="aspect-square w-16 h-16">
      <img
        :src="imageUrl"
        class="w-full h-full object-cover rounded-lg shadow-md"
      />
    </div>

    <div class="flex flex-col justify-between">
      <h1 class="!mb-0 text-lg font-semibold line-clamp-1">
        {{ file.filename }}
      </h1>
      <h1 class="!mb-0 text-sm text-gray-400">{{ formattedTimestamp }}</h1>
    </div>

    <div>
      <v-menu bottom left>
        <template #activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon color="black">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="action in imageActions"
            :key="action.name"
            @click="action.handler"
          >
            {{ action.name }}
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-dialog v-model="dialog" width="1200">
      <v-card>
        <v-card-title>Image Details</v-card-title>
        <v-card-text>
          <img
            :src="imageUrl"
            class="w-full h-auto rounded-lg shadow-md mb-5"
          />
          <p><span class="font-bold">Filename:</span> {{ file.filename }}</p>
          <p>
            <span class="font-bold">Uploaded at:</span> {{ formattedTimestamp }}
          </p>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { baseURL, deleteFile, duplicateFile } from '~/api/useFiles'
import type { FileSchemaType } from '~/schema/FileSchema'

export default defineComponent({
  name: 'ImageCard',
  props: {
    file: {
      type: Object as () => FileSchemaType,
      required: true,
    },
  },
  setup(props, { emit }) {
    const dialog = ref(false)

    const imageActions = computed(() => [
      { name: 'View Detail', handler: handleOpenDetailedView },
      { name: 'Download', handler: handleDownload },
      { name: 'Delete', handler: handleDelete },
      { name: 'Duplicate', handler: handleDuplicate },
    ])

    const imageUrl = computed(() => `${baseURL}/uploads/${props.file.filename}`)

    const formattedTimestamp = computed(() =>
      new Date(props.file.timestamp).toLocaleString()
    )

    const handleOpenDetailedView = () => {
      dialog.value = true
    }

    const handleDownload = () => {
      if (imageUrl.value) {
        window.open(imageUrl.value, '_blank')
      }
    }

    const handleDelete = async () => {
      try {
        await deleteFile(props.file.filename)
        emit('deleted', props.file.filename)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to delete:', e)
      }
    }

    const handleDuplicate = async () => {
      try {
        await duplicateFile(props.file.filename)
        emit('duplicated', props.file.filename)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to duplicate:', e)
      }
    }

    return {
      dialog,
      imageUrl,
      formattedTimestamp,
      imageActions,
      handleOpenDetailedView,
    }
  },
})
</script>

<style scoped>
.aspect-square {
  aspect-ratio: 1 / 1;
}
</style>
