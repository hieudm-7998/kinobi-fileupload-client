<template>
  <div @dblclick="handleClick">
    <a :href="itemUrl" target="_blank" rel="noopener" class="d-block mb-2">
      {{ item.filename }}
    </a>

    <v-btn icon small color="primary" @click="handleClick">
      <v-icon>
        mdi-eye-outline
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'UploadedItemCard',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    itemUrl() {
      const base =
        process.env.API_BASE_URL ||
        'https://kinobi-fileupload-server.onrender.com'
      return `${base}/uploads/${this.item.filename}`
    },
  },
  methods: {
    handleClick() {
      this.$emit('show-dialog', this.item)
    },
  },
}
</script>
