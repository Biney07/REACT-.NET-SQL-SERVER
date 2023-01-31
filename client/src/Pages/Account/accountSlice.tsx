import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";

import { history } from "../..";
import agent from "../../API/agent";
import { User } from "../../models/user";


interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null
}

export const signInUser = createAsyncThunk<User, FieldValues>(
    'account/signInUser',
    async (data, thunkAPI) => {
        try {
            const user = await agent.Account.login(data);
            console.log(user);
            console.log("sboni");
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return console.log("sboni");
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async (_, thunkAPI) => {
        console.log('localstorage');
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        try {
            console.log('localstorage');
            const userDto = await agent.Account.currentUser();
            const { ...user } = userDto;
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
            
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            history.push('/');
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            console.log("bab");
            history.push('/');
        });
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload;
        });
        builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
            throw action.payload;
        })
    })
})

export const { signOut, setUser } = accountSlice.actions;