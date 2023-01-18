import { configureStore } from '@reduxjs/toolkit'
import {counterSlice} from '../Pages/CounterSlice'
//Reducers are pure functions that receive the current state and incoming action as arguments, and return a new state.
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,

  }
})
export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch