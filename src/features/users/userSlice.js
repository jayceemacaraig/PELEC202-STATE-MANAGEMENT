import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const userSlice = createSlice({
    name: "users",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
        addUser: (state, action) => {
            state.list.push(action.payload);
        },
        deleteUser: (state, action) => {
            const id = action.payload;
            state.list = state.list.filter((user) => user.id !== id);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
