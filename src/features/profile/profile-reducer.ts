import {ChangeNameOrImgType, regAPI} from "../../api/api";
import {AppThunk} from "../../app/store";
import {setAppStatusAC, setErrAC} from "../../app/app-reducer";

const initialState = {
    name: '' as string,
    avatar: '' as string,
    email: '' as string
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "PROFILE/SET-USER-NAME":{return {...state,...action.data}}
        default:
            return state
    }
}

//action
export const setUserData=(data:UserDataType)=>({type:'PROFILE/SET-USER-NAME',data})

//thunk
export const setProfileUserName=():AppThunk=>(dispatch)=>{
    regAPI.me()
        .then((response)=>dispatch(setUserData({
            name:response.data.name,
            email:response.data.email
        })))
}
export const changeUserName=(userName:{name:string}):AppThunk=>(dispatch)=>{
    dispatch(setAppStatusAC('loading'))
    regAPI.changeNameOrImg(userName)
        .then(response=>dispatch(setUserData(userName)))
        .catch((error)=>{
            dispatch(setErrAC(error.message ? error.message : "some error occurred"))
        })
        .finally(()=>dispatch(setAppStatusAC('idle')))
}

//types
export type UserDataType={
    name?: string,
    avatar?: string,
    email?: string
}
type InitialStateType = typeof initialState
type ActionType = ReturnType<typeof setUserData>