<template>
    <div
        class="flex items-center gap-4 p-4 rounded-lg border-2 border-transparent bg-white shadow hover:border-gray-100 hover:shadow-lg hover:bg-gray-50 transition-all duration-200">
        <div class="aspect-square w-16 h-16">
            <img :src="imageUrl" class="w-full h-full object-cover rounded-lg shadow-md" />
        </div>

        <div class="flex flex-col justify-between">
            <h1 class="!mb-0 text-lg font-semibold line-clamp-1">{{ file.filename }}</h1>
            <h1 class="!mb-0 text-sm text-gray-400">{{ new Date(file.timestamp).toLocaleString() }}</h1>
        </div>

        <div>
            <v-menu bottom left>
                <template #activator="{ on, attrs }">
                    <v-btn dark icon v-bind="attrs" v-on="on">
                        <v-icon color="black">mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item @click="handleDuplicate">
                        <v-icon left color="blue">mdi-content-copy</v-icon>
                        Duplicate
                    </v-list-item>
                    <v-list-item @click="handleDelete">
                        <v-icon left color="red">mdi-delete</v-icon>
                        Delete
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </div>
</template>

<script>
import { deleteFile, duplicateFile } from '~/api/files.js'

export default {
    name: 'ImageBox',
    props: {
        file: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        imageUrl() {
            if (!this.file) return ''
            const base = process.env.API_BASE_URL || 'http://localhost:3001'
            return `${base}/uploads/${this.file.filename}`
        }
    },
    methods: {
        async handleDelete() {
            try {
                await deleteFile(this.file.filename)
                this.$emit('deleted', this.file.filename)
            } catch (e) {
                console.error('Failed to delete:', e)
            }
        },
        async handleDuplicate() {
            try {
                await duplicateFile(this.file.filename)
                this.$emit('duplicated', this.file.filename)
            } catch (e) {
                console.error('Failed to duplicate:', e)
            }
        }
    }
}
</script>

<style scoped>
.aspect-square {
    aspect-ratio: 1 / 1;
}
</style>
