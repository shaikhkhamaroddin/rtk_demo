import {createSlice,createAsyncThunk, configureStore, } from "@reduxjs/toolkit";
import { fetchUsersAPI } from "../api/api";

// initial state for app
const initState = {
    count: 0,
    isError: false,
    loading: false,
    data: null
}

// async thunk action having status pending,fullfilled and rejected
export const fetchUsers = createAsyncThunk('fetch/users',
    async () => {
        const res = await fetchUsersAPI()  // request pending
        if (res.status === 200) {
            return res.json();  // request fullfilled
        } else {
            throw res.json();   // request rejected
        }
    })

// counter slice with combined actions and reducers
const CountReducer = createSlice({
    name: 'countReducer',
    initialState: initState,
    reducers: {
        // non async action,reducers
        incr: (state, action) => { state.count += 1; },
        decr: (state, action) => { state.count -= 1; },
        reset: (state, action) => {
            return initState;   // 1st approach to set state as initstate
            //    return Object.assign({},initState); 2nd approach
            // state.count=0;   // 3rd approach
            // state.data=null;
            // state.data=null;
            // state.loading=false;
        }
    },
    // async action and reducer
    extraReducers: {
        [fetchUsers.pending]: (state, action) => { state.loading = true; state.isError = false; },
        [fetchUsers.fulfilled]: (state, action) => { state.data = action.payload; state.isError = false; state.loading = false; },
        [fetchUsers.rejected]: (state, action) => { state.loading = false; state.isError = true; }
    }
});

// export actions for dispatch operation
export const { incr, decr, reset } = CountReducer.actions;

// Create store with above reducer
export const store = configureStore({
    reducer: {
        counter: CountReducer.reducer,
    }
})