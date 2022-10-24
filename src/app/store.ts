import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { AppActionType, appReducer } from './app-reducer'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ActionsType, authReducer } from '../features/auth/auth-reducer'

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    // registration: registrationReducer,
    // forgotPassword: forgotPasswordReducer,
    // login: loginReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppRootActionType = ActionsType | AppActionType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionType>

// @ts-ignore
window.store = store
