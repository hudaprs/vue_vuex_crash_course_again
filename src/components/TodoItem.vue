<template>
  <div class="todo-item">
    <p>{{ todo.title }}</p>

    <div v-if="isLoading"></div>
    <div v-else class="del-todo" @click.prevent="deleteTodo(todo)">
      X
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TodoItem',
  props: ['todo'],
  computed: {
    ...mapState('todo', ['isLoading'])
  },
  methods: {
    deleteTodo(todo) {
      this.$store.dispatch('todo/removeTodo', todo)
    }
  }
}
</script>

<style>
.todo-item {
  background-color: #ccc;
  margin-bottom: 5px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.del-todo {
  background-color: #ff0000;
  color: #fff;
  border-radius: 50%;
  padding: 2px 4px;
  cursor: pointer;
}
</style>
