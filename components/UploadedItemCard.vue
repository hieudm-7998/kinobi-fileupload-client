<template>
  <div>
    <v-img max-height="150" max-width="250" :src="itemUrl" />
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
  mounted() {
    console.log(this.item, 'this.item')
  }
}
</script>
