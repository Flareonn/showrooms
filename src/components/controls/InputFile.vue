<template>
  <div class="upload">
    <label :for="id">{{ placeholder }}</label>
    <input
      v-bind="$attrs"
      :id="id"
      ref="file"
      type="file"
      name="file"
      @change="onUpload"
    />
  </div>
</template>

<script>
export default {
  name: 'InputFile',
  inheritAttrs: false,
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Загрузить',
    },
  },
  methods: {
    /** @param {Event} e */
    onUpload(e) {
      const [file] = e.target.files
      this.$emit('change', URL.createObjectURL(file))
    },
    trigger() {
      this.$refs.file.click()
    },
  },
}
</script>