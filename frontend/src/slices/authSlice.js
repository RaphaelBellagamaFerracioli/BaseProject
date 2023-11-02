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
export const register = createAsyncThunk("auth/register", async (user, thunkAPI) =>{

    const data = await authService.register(user)

    //checa error
    if(data.errors){

        return thunkAPI.rejectWithValue(data.errors[0])//vai exibir erro por erro

    }
    return data;

}
);

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
                state.error = false;
            

            }).addCase(register.fulfilled,(state, action) =>{
                
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload
                
                //acessa o slice de autenticação e pega os dados de usuario
            }).addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
              });

        },
});

export const {reset} = authSlice.actions
export default authSlice.reducer; //o slice nada mais é do que o reducer aqui