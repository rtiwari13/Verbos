import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth/authSlice"
import themeReducer from "../features/theme/themeSlice"
import documentReducer from "../features/docs/docSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      theme: themeReducer,
      docs: documentReducer,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

