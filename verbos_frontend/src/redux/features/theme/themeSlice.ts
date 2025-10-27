import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Theme } from "@/types/theme";

const initialState : Theme =  {
    ColorTheme : "System",
    isLoading : true
}


const themeSlice = createSlice({
    name : "theme",
    initialState,
    reducers:{
        updateTheme :(
            state,
            action: PayloadAction<{newTheme:Theme}>
        ) => {

            state.ColorTheme = action.payload.newTheme.ColorTheme;

        },
        setLoading :(
            state,
            action: PayloadAction<{newTheme:Theme}>

        ) => {
            state.isLoading = action.payload.newTheme.isLoading;
        }
    }
})

export const {updateTheme , setLoading} = themeSlice.actions;
export default themeSlice.reducer;