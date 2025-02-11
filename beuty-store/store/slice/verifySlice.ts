import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/app/axios/axios";
import { error } from "console";

interface VerifyState<T> {
  isLoading: boolean;
  isVerified: boolean;
  error: any;
}

const initialState:VerifyState={
    isLoading:false,
    isVerified:false,
    error:null,
}


export const verifyCode=createAsyncThunk(
    'auth/verifyCode',
    async(code:string,{rejectWithValue})=>{
        try{
            const response=await axiosInstance.post("/accounts/confirm-code/",{code})
            const {token}=response.data
            localStorage.setItem("userToken",token)
            return response.data
        }catch(error:any){
            return rejectWithValue(error.response.data||"Ошибка верификации")
        }
    }
)

const verifySlice=createSlice({
    name:"verify",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(verifyCode.pending,(state)=>{
            state.isLoading=true
        })

        .addCase(verifyCode.fulfilled,(state)=>{
            state.isLoading=false
            state.isVerified=true
        })

        .addCase(verifyCode.rejected,(state,action)=>{
            state.isLoading=false
            state.isVerified=false
            state.error=action.payload as string
        })
    }
})


export default verifySlice.reducer;
