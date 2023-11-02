import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";


const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    error: false,
    success: false,
    loading: false,
  };

//faz o registro de log do usuario
export const register = createAsyncThunk("auth/register",

async (user, thunkAPI) =>{

    const data = await authService.register(user)

    //checa error
    if(data.errors){

        return thunkAPI.rejectWithValue(data.errors[0])//vai exibir erro por erro

    }
    return data;

}
);

    export const logout = createAsyncThunk("auth/logout", async () => {
        await authService.logout();
    });

  export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    const data = await authService.login(user);
  

  // Check for errors
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }
  return data;
});

export const authSlice = createSlice({

    name:"auth",
    initialState,
    reducers:{
        reset: (state) =>{
            state.loading =false;
            state.error = false;
            state.success = false;
        },
    },

    extraReducers: (builder) =>{
            builder.addCase(register.pending, (state) =>{

                state.loading = true;
                state.error = null;
            

            }).addCase(register.fulfilled,(state, action) =>{
                
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload
                
                //acessa o slice de autenticação e pega os dados de usuario
            }).addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log(action.payload)
                state.user = null;

              }).addCase(logout.fulfilled, (state) => {
                state.user = false;
                state.loading = true;
                state.success = null;
                state.user = null;
              })
              .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
              })
              .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
              });

        },
});

export const {reset} = authSlice.actions
export default authSlice.reducer; //o slice nada mais é do que o reducer aqui