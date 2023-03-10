import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../API/agent";
import { Basket } from "../../models/basket";
import { getCookie } from "../../util/util";

interface BasketState {
    basket: Basket | null;
    status: string;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

export const fetchBasketAsync = createAsyncThunk<Basket>(
    'basket/fetchBasketAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Basket.get();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    },
    {
        condition: () => {
            if (!getCookie('buyerId')) return false;
        }
    }
)

export const addBasketItemAsync = createAsyncThunk<Basket, {banoriId: number, quantity?: number}>(
    'basket/addBasketItemAsync',
    async ({banoriId, quantity = 1}, thunkAPI) => {
        try {
            return await agent.Basket.addItem(banoriId, quantity);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<void, 
    {banoriId: number, quantity: number, name?: string}>(
    'basket/removeBasketItemAsync',
    async ({banoriId, quantity}, thunkAPI) => {
        try {
            await agent.Basket.removeItem(banoriId, quantity);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload
        },
        clearBasket: (state) => {
            state.basket = null;
        }
    },
    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingAddItem' + action.meta.arg.banoriId;
        });
        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.banoriId + action.meta.arg.name;
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const {banoriId, quantity} = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(i => i.banoriId === banoriId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity;
            if (state.basket?.items[itemIndex].quantity === 0) 
                state.basket.items.splice(itemIndex, 1);
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled), (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addMatcher(isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected), (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    })
})

export const {setBasket, clearBasket} = basketSlice.actions;