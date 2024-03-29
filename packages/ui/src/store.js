import { createStore, action } from 'easy-peasy'
import { queries } from './lib/queries'
export const store = createStore({
  channels: {
    data: [],
    update: action((state, payload) => {
      state.data = payload
    })
  },
  query: {
    value: queries('all', 'all'),
    update: action((state, payload) => {
      state.value = payload
    })
  },
  addresses: {
    value: 'all'
  }
})
