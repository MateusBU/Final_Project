<template>
  <img
    :src="gravatarUrl"
    :alt="alt"
  />
</template>

<script>
import md5 from 'md5';

export default {
  name: 'userGravatar',
  props: {
    email: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: 'Gravatar',
    },
    size: {
      type: Number,
      default: 100,
    },
    defaultImage: {
      type: String,
      default: 'identicon',
    },
  },
  computed: {
    gravatarUrl() {
      const hash = md5(this.email.trim().toLowerCase());
      return `https://www.gravatar.com/avatar/${hash}?s=${this.size}&d=${this.defaultImage}`;
    },
  },
};
</script>
