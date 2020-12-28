<template>
  <div>
    <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="true"
      :visible="value"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value(e) {
      console.log(e);
    },
  },
  methods: {
    onClose() {},
    afterVisibleChange() {},
  },
};
</script>

<style></style>
