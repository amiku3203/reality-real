import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loading: false,  // Loading state for user details
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setUserDetails, setLoading } = userSlice.actions;
export default userSlice.reducer;
