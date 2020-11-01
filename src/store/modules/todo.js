import axios from 'axios'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

const state = {
  isLoading: false,
  todos: [],
  todoTitle: '',
  todoCurrent: '',
  todoError: null
}

const getters = {
  getTodos: state => state.todos
}

const mutations = {
  SET_LOADING: state => (state.isLoading = true),
  SET_TODOS: (state, payload) => {
    if (payload.name !== 'Error') state.todos = payload
    else state.error = payload
    state.isLoading = false
  },
  SET_TODO_TITLE: (state, payload) => (state.todoTitle = payload),
  CLEAR_TODO_TITLE: state => (state.todoTitle = ''),
  CREATE_TODO: (state, payload) => {
    if (payload.name !== 'Error') state.todos = [payload, ...state.todos]
    else state.error = payload
    state.isLoading = false
  },
  DELETE_TODO: (state, payload) => {
    if (payload.name !== 'Error')
      state.todos = state.todos.filter(todo => todo.id !== payload.id)
    else state.error = payload
    state.isLoading = false
  }
}

const actions = {
  fetchTodos: async ({ commit }) => {
    commit('SET_LOADING')
    try {
      const { data } = await axios('/todos?_limit=10')

      commit('SET_TODOS', data)
      return data
    } catch (err) {
      return err
    }
  },
  addTodo: async ({ commit }, payload) => {
    commit('SET_LOADING')
    try {
      const { data } = await axios.post('/todos', payload)

      commit('CREATE_TODO', data)
      commit('CLEAR_TODO_TITLE')
      return data
    } catch (err) {
      return err
    }
  },
  removeTodo: async ({ commit }, payload) => {
    commit('SET_LOADING')
    try {
      await axios.delete(`/todos/${payload.id}`)

      commit('DELETE_TODO', payload)
    } catch (err) {
      return err
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}
