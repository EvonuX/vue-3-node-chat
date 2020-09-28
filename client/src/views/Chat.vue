<template>
  <div class="chat">
    <aside class="chat__users">
      <h1 class="chat__users--title">
        <span>{{ state.room }}</span>
        <button class="sidebar--toggle" @click="state.isOpen = !state.isOpen">MENU</button>
      </h1>

      <Sidebar :users="state.users" :isOpen="state.isOpen" />
    </aside>

    <main class="chat__messages" ref="messages">
      <div>
        <ChatWindow :messages="state.messages" :username="state.username" />
      </div>

      <form @submit.prevent="sendMessage" class="chat__form">
        <input
          type="text"
          class="input"
          name="message"
          placeholder="Enter your message"
          autocomplete="off"
          v-model="state.message"
        />
        <button :disabled="state.message.length === 0" type="submit" class="btn btn--primary">
          Send
        </button>
      </form>
    </main>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import io from 'socket.io-client'

import ChatWindow from '@/components/ChatWindow'
import Sidebar from '@/components/Sidebar'
import notify from '@/utils/notify'

export default {
  name: 'Chat',

  components: { Sidebar, ChatWindow },

  setup() {
    const route = useRoute()
    const router = useRouter()

    let messages = ref(null)

    const state = reactive({
      users: {},
      username: '',
      createdAt: '',
      message: '',
      messages: [],
      room: '',
      isActive: true,
      isOpen: false
    })

    document.addEventListener('visibilitychange', () => {
      state.isActive = document.hidden
    })

    function sendMessage() {
      state.socket.emit('sendMessage', state.message, error => {
        if (error) {
          throw new Error(error)
        } else {
          state.message = ''
        }
      })
    }

    onMounted(() => {
      const { username, room } = route.params
      state.username = username
      state.room = room
      if (process.env.NODE_ENV === 'production') {
        state.socket = io('https://v3-node-chat.herokuapp.com/')
      } else {
        state.socket = io('http://localhost:8000/')
      }

      const user = {
        username: state.username,
        room: state.room
      }

      state.socket.emit('join', user, error => {
        if (error) {
          router.push('/')
          alert(error)
        }
      })

      state.socket.on('message', msg => {
        state.messages.push({
          id: msg.id,
          username: msg.username,
          text: msg.text,
          createdAt: new Date(msg.createdAt).toLocaleString()
        })

        if (msg.username !== 'Admin') {
          messages.value.scrollTop = messages.value.scrollHeight - messages.value.clientHeight
        }

        if (msg.username !== state.username && state.isActive) {
          notify(msg.username, msg.text)
        }
      })

      state.socket.on('roomData', ({ users }) => {
        state.users = users
      })
    })

    return { state, messages, sendMessage }
  }
}
</script>

<style lang="scss" scoped>
.chat {
  display: grid;
  grid-template-columns: 20% auto;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 768px) {
    grid-template-columns: 100%;
  }

  &__users {
    &--title {
      position: relative;
      z-index: 2;
      padding: 3rem;
      margin: 0;
      background-color: var(--primary);

      @media screen and (max-width: 768px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  &__messages {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
    padding: 3rem;
    background-color: var(--bg-secondary);
    max-height: 100vh;
    overflow-y: scroll;

    @media screen and (max-width: 768px) {
      height: 85vh;
    }
  }

  &__form {
    display: grid;
    grid-template-columns: 93% auto;
    margin-top: 3rem;

    @media screen and (max-width: 768px) {
      grid-template-columns: 75% auto;
    }

    input {
      border-radius: 0.3rem 0 0 0.3rem;
    }

    button {
      border-radius: 0 0.3rem 0.3rem 0;
    }
  }
}

.sidebar--toggle {
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    color: #fff;
    font-size: 1.8rem;
  }
}
</style>