<template>
  <v-dialog v-model="internalDialog" max-width="600">
    <v-card>
      <v-card-title class="text-h6 grey lighten-2">
        {{ item?.filename || 'Image Detail' }}
      </v-card-title>

      <v-card-text>
        <v-img
          v-if="item"
          :src="imageUrl"
          max-height="400"
          contain
        />
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" text @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ImageDetailDialog',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object,
      default: null,
    },
  },
  computed: {
    internalDialog: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
    imageUrl() {
      if (!this.item?.filename) return ''
      const base = process.env.API_BASE_URL || 'https://kinobi-fileupload-server.onrender.com'
      return `${base}/uploads/${this.item.filename}`
    },
  },
  methods: {
    close() {
      this.internalDialog = false
    },
  },
}
</script>
