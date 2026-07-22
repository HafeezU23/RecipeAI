import { createSlice  } from "@reduxjs/toolkit";

const initialState = {
  user:null,
  isAuthenticated: false,
  token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
       
        setUser: (state, action)=>{
            state.user = action.payload.user;
            state.isAuthenticated = !!action.payload.user;
            state.token = action.payload.token;
        },
        setLogout:(state)=>{
            state.user=null;
            state.isAuthenticated=false;
            state.token=null
        }
       
    }
})

export const {setUser, setLogout} = authSlice.actions;
export default authSlice.reducer