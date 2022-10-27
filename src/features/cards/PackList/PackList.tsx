import React, {useState} from 'react'
import s from './PackList.module.scss'
import Button from '@mui/material/Button'
import {Navigate} from 'react-router-dom'
import {routes} from '../../../app/routes/Routes'
import {useAppDispatch, useAppSelector} from '../../../app/store'
import {SettingsBlock} from './SettingsBlock/SettingsBlock'
import {PackListTable} from './Table/PackListTable'
import {PaginationBlock} from '../../../common/components/PaginationBlock/PaginationBlock'
import {addPackTC, getPacksTC} from '../packs-reducer'
import {InitialStateSettingType} from "./SettingsBlock/setting-reducer";
import {GetPackParams} from "../../../api/packsAPI";

export const PackList = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const [myPack, setMyPack] = useState(false)

    const newPack = {
        cardsPack: {
            name: 'test Pack',
            deckCover: '',
            private: false,
        },
    }
    const filterWithSlider = (value:GetPackParams) => {
        dispatch(getPacksTC(value))
    }
    const resetPackListFilter=(data:GetPackParams) => {
        dispatch(getPacksTC({ ...data }))
    }
    const setFilterPack=(user_id:string, pageCount:number)=>{
        dispatch(getPacksTC({user_id, pageCount}))
    }
    const searchPack=(searchValue:string)=> {
        dispatch(getPacksTC({ packName: searchValue,pageCount:8 }))
    }
    const addNewPack = () => {
        dispatch(addPackTC(newPack, { pageCount: 8 }))
    }

    if (!isLoggedIn) {
        return <Navigate to={routes.login} />
    }

    return (
        <div className={s.packListContainer}>
            <div className={s.headBlock}>
                <h2 className={s.headName}>Pack list</h2>
                <Button type={'button'} variant={'contained'} color={'primary'} className={s.button} onClick={addNewPack}>
                    Add new pack
                </Button>
            </div>
            <SettingsBlock
                searchPack={searchPack}
                setFilterPack={setFilterPack}
                resetPackListFilter={resetPackListFilter}
                filterWithSlider={filterWithSlider}
            />
            <PackListTable myPack={myPack} />
            <PaginationBlock />
        </div>
    )
}
