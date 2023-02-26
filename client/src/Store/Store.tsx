import { configureStore } from '@reduxjs/toolkit'
import { basketSlice } from '../Components/BasketComponets/basketSlice';
import { accountSlice } from '../Pages/Account/accountSlice'
import { catalogSlice } from '../Pages/Catalog/CatalogSlice';
import { banoriSlice } from '../Admin/Banoret/BanoriSlice';

//Reducers are pure functions that receive the current state and incoming action as arguments, and return a new state.
const store = configureStore({
  reducer: {
        catalog: catalogSlice.reducer,
        account: accountSlice.reducer,
        basket: basketSlice.reducer,
        banori: banoriSlice.reducer,

  }
})
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch