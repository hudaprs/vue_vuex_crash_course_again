<template>
  <div>
    <h1 class="title">Todos</h1>
    <TodoForm />

    <div class="content">
      <div v-if="isLoading">
        Loading...
      </div>
      <div>
        <div v-for="todo in todos" :key="todo.id">
          <TodoItem :todo="todo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'

export default {
  name: 'Todo',
  components: {
    TodoForm,
    TodoItem
  },
  computed: {
    ...mapState('todo', ['isLoading', 'todos'])
  },
  async created() {
    await this.$store.dispatch('todo/fetchTodos')
  }
}
</script>

<style>
.title {
  text-align: center;
}

.content {
  padding: 30px 0px;
}
</style>
