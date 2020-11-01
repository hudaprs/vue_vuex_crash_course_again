<template>
  <form @submit.prevent="createTodo" class="form-container">
    <input
      type="text"
      placeholder="What Need's to be done..."
      :value="todoTitle"
      @keyup.prevent="setTodoTitle"
    />
    <button type="submit" :disabled="isLoading">
      Add
    </button>
  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TodoForm',
  computed: {
    ...mapState('todo', ['isLoading', 'todoTitle'])
  },
  methods: {
    setTodoTitle(e) {
      this.$store.commit('todo/SET_TODO_TITLE', e.target.value)
    },
    createTodo() {
      const newTodo = {
        title: this.todoTitle,
        completed: false
      }

      this.$store.dispatch('todo/addTodo', newTodo)
    }
  }
}
</script>

<style>
.form-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

input {
  padding: 3px 10px;
}

button {
  border: none;
  background-color: #555;
  color: #fff;
  width: auto;
  padding: 5px 10px;
  margin-left: 1;
  display: inline-block;
  cursor: pointer;
  transition: all 1s;
}

button:hover {
  opacity: 0.6;
}
</style>
