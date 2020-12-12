<template>
  <v-card class="overflow-auto" v-bind="{ ...attributes }" flat>
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  name: "ScrollableCard",

  props: ["attributes"],
};
</script>

<style></style>
