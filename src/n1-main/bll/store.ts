import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {appReducer} from "./app-reducer";
import {loginReducer} from "./login-reducer";
import {profileReducer} from "./profile-reducer";
import {registrationReducer} from "./registartion-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    profile: profileReducer,
    registration: registrationReducer
})


export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export type AppActionType = any;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>;

// @ts-ignore
window.store = store;

