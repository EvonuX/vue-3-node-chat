<template>
  <div class="sidebar" :class="{ 'sidebar--open': isOpen }">
    <h2 class="sidebar__title">Users</h2>

    <ul class="sidebar__users">
      <li v-for="user in users" :key="user.id">{{ user.username }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',

  props: {
    users: {
      type: Object,
      required: true
    },

    isOpen: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  padding: 3rem;
  transition: all 0.3s ease;

  @media screen and (max-width: 768px) {
    opacity: 0;
    background-color: var(--bg);
    position: fixed;
    top: -10rem;
    z-index: -1;
    width: 100%;

    &--open {
      opacity: 1;
      top: 10rem;
      z-index: 1;
    }
  }

  &__title {
    padding-bottom: 1.5rem;
  }

  &__users {
    display: block;
    border-top: 1px solid;

    li {
      padding: 1.5rem 0;
    }
  }
}
</style>