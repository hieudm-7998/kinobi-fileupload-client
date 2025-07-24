<template>
    <div v-if="files.length === 0" class="h-full flex flex-col items-center justify-center text-gray-500">
        <v-icon large class="mb-2">mdi-image-off</v-icon>
        <span>No images uploaded yet.</span>
    </div>
    <div v-else class="h-full overflow-y-auto pr-2">
        <h2 class="text-2xl font-bold mb-5">Uploaded images</h2>
        <div class="space-y-4">
            <ImageCard v-for="file in files" :key="file.id" class="flex items-center gap-4" :file="file"
                @deleted="onDelete" @duplicated="onDuplicate" />
        </div>
    </div>
</template>

<script>
import ImageCard from '~/components/ImageCard.vue';

export default {
    name: 'ImageBox',
    components: {
        ImageCard
    },
    props: {
        files: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        onDelete(filename) {
            this.$emit('deleted', filename)
        },
        onDuplicate(filename) {
            this.$emit('duplicated', filename)
        }
    }
};
</script>