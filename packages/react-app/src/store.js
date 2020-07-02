import { createStore, action } from 'easy-peasy'

export default createStore({
  channels: {
    data: [],
    update: action((state, payload) => {
      state.data = payload
    })
  },
  query: {
    value: ``,
    update: action((state, payload) => {
      state.value = payload
    })
  }
})
