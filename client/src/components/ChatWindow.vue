<template>
  <div class="messages">
    <div
      class="messages__message"
      v-for="message in messages"
      :key="message.id"
      :class="{
        'user--message': message.username === username,
        'admin--message': message.username === 'Admin'
      }"
    >
      <div v-if="message.username !== 'Admin'" class="messages__message--meta">
        <p>{{ message.username }}</p>
        <p>{{ message.createdAt }}</p>
      </div>

      <div class="message__message--text">{{ message.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chat',

  props: {
    username: {
      type: String,
      required: true
    },
    messages: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.messages {
  &__message {
    margin: 1rem 0;
    padding: 1.5rem;
    max-width: 40rem;
    background-color: var(--bg);
    border-radius: 0.5rem;

    @media screen and (max-width: 768px) {
      max-width: 25rem;
    }

    &--meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
      font-size: 1.6rem;

      p:last-child {
        font-size: 1.4rem;
      }
    }
  }
}

.user--message {
  margin-left: auto;
  background-color: var(--primary);
}

.admin--message {
  max-width: 100%;
  text-align: center;
}
</style>