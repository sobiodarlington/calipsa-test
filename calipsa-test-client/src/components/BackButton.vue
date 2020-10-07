<template>
<button class="btn mr-auto" @click="goBack">
  <b-icon
    font-scale="2"
    icon="arrow-left"
    aria-hidden="true"></b-icon>
</button>
</template>

<script>
export default {
  name: "BackButton",
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
};
</script>
