import React, { useState } from 'react'
import { PackList } from './PackList/PackList'
import { CardsList } from './CardsList/CardsList'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { Navigate, useNavigate } from 'react-router-dom'
import { addPackTC } from './packs-reducer'
import { routes } from '../../app/routes/Routes'
import { PagePack } from './PagePack/PagePack'

export const Cards = () => {
    // const dispatch = useAppDispatch()
    // const [myPack, setMyPack] = useState(false)
    //
    // const addNewPack = (newPack: any, params: any) => {
    //     dispatch(addPackTC(newPack, {}))
    // }

    return (
        <div>
            <PackList />
            <CardsList />
            <PagePack />
        </div>
    )
}
