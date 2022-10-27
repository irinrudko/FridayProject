import React from 'react'
import s from '../../SettingsBlock.module.scss'
import { useAppDispatch } from '../../../../../../app/store'
import { getPacksTC } from '../../../../packs-reducer'
import { setSetting } from '../../setting-reducer'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'

const ResetFilter = () => {
    const dispatch = useAppDispatch()
    const resetFilter = () => {
        dispatch(getPacksTC({}))
        dispatch(setSetting({ user_id: '', packName: '', min: 0, max: 110, sortPacks: '', page: 0, pageCount: 0, block: false }))
    }
    return (
        <div className={s.thirdSquare} onClick={resetFilter}>
            <FilterAltOffIcon fontSize={'medium'} />
        </div>
    )
}

export default ResetFilter
