import { createStore, action } from 'easy-peasy'

export default createStore({
  channels: {
    data: ['test', 'test1'],
    update: action((state, payload) => {
      state.data = payload
    })
  }
})
