import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Theme } from "@/types/theme";

const initialState : Theme =  {
    ColorTheme : "System"
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

        }
    }
})

export const {updateTheme} = themeSlice.actions;
export default themeSlice.reducer;