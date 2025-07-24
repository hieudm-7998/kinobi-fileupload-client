<template>
  <v-form @submit.prevent="handleUpload">
    <v-file-input
      v-model="file"
      label="Select image"
      accept="image/*"
      required
    />
    <v-btn type="submit" color="primary" :loading="loading">Upload</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      loading: false,
    };
  },
  methods: {
    async handleUpload() {
      if (!this.file) return;
      this.loading = true;
      const form = new FormData();
      form.append('file', this.file);

      try {
        await this.$axios.post('/upload', form);
        this.$emit('uploaded');
        this.file = null;
      } catch (e) {
        console.error('Upload failed:', e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
