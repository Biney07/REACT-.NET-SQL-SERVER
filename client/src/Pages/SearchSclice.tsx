import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../Store/Store'

// Define a type for the slice state
interface SearchState {
    value: string
}

// Define the initial state using that type
const initialState: SearchState = {
    value: ""
}

export const SearchSlice = createSlice({
    name: 'searcher',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        
        // Use the PayloadAction type to declare the contents of `action.payload`
        updatee: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    }
})

export const {updatee} = SearchSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default SearchSlice.reducer