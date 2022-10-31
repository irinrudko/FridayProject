import { packsReducer, PacksActionsType } from '../features/cards/PackList/packs-reducer'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { AppActionType, appReducer } from './app-reducer'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { authReducer, AuthActionsType } from '../features/auth/auth-reducer'
import { CardsActionsType, cardsReducer } from '../features/cards/CardsList/cards-reducer'
import { tableReducer } from '../features/cards/PackList/table-reducer'
import { SettingActionsType, settingReducer } from '../features/cards/PackList/SettingsBlock/setting-reducer'
import { CardParamsActionsType, cardParms } from '../features/cards/CardsList/cardParams-reducer'

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    packs: packsReducer,
    cards: cardsReducer,
    table: tableReducer,
    setting: settingReducer,
    cardParams: cardParms,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type AppRootActionType =
    | AuthActionsType
    | AppActionType
    | PacksActionsType
    | CardsActionsType
    | SettingActionsType
    | CardParamsActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionType>

// @ts-ignore
window.store = store
