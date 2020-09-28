<template>
  <div class="home">
    <form class="home__form" @submit.prevent="onJoin">
      <div class="input--group">
        <label for="username">Username</label>
        <input
          v-model="state.username"
          name="username"
          class="input"
          id="username"
          type="text"
          placeholder="Username"
          minlength="3"
          maxlength="15"
          required
        />
      </div>

      <div class="input--group">
        <label for="room">Room</label>
        <input
          v-model="state.room"
          name="room"
          class="input"
          id="room"
          type="text"
          placeholder="Room"
          minlength="3"
          maxlength="15"
          required
        />
      </div>

      <div class="input--group">
        <button type="submit" class="btn btn--primary">Join</button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',

  setup() {
    const router = useRouter()

    const state = reactive({
      username: '',
      room: ''
    })

    function onJoin() {
      router.push(`/chat/${state.username}/${state.room}`)
    }

    return { state, onJoin }
  }
}
</script>

<style lang="scss" scoped>
.home {
  &__form {
    background-color: var(--bg-secondary);
    display: flex;
    flex-direction: column;
    padding: 3rem;
    box-shadow: var(--box-shadow);
    border-radius: 0.5rem;
    border: 1px solid var(--bg);

    input {
      background-color: var(--bg);
      color: var(--text);
    }
  }
}
</style>