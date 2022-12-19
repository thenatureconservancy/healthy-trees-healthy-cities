<template>
  <div style="font-size: 16px" class="q-mt-lg q-mb-sm">
    User Photos Upload Example
  </div>
  <q-file
    filled
    bottom-slots
    v-model="file"
    label="Select File"
    max-files="1"
    clearable
    append
    accept=".jpg, image/*"
    @rejected="onRejected"
  >
    <template v-slot:prepend>
      <q-icon name="cloud_upload" @click.stop />
    </template>

    <template v-slot:hint>
      Click in box above to select a photo to upload to S3.
    </template>
  </q-file>
  <br />
  <br />
  <div class="q-mt-lg" v-if="file != null" style="text-align: center">
    <q-btn
      @click="uploadFile"
      size="md"
      outline
      no-caps
      padding="4px 10px"
      color="primary"
      label="Upload Photo to S3"
    />
  </div>
</template>

<script>
export default {
  data() {
    return { file: null };
  },
  methods: {
    async uploadFile() {
      //   this.loadingVisible = true;
      const params = {
        file: this.file,
        // label: this.label,
        // filePath: `${this.$store.state.authUserStore.ouInfo.ou}/${this.$store.state.interestType}/${this.$store.state.selectedInterest.value}`,
      };
      const upload = await this.$store.dispatch('uploadPhotosToS3', params);
      this.file = null;
    },
    onRejected(evt) {
      console.log(evt);
    },
  },
};
</script>

<style scoped></style>
