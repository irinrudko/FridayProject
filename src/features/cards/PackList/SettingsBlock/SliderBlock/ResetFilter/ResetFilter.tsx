import React from 'react'
import s from '../../SettingsBlock.module.scss'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import { GetPackParams } from '../../../../../../api/packsAPI'

type ResetFilterPropsType = {
    resetPackListFilter: (data: GetPackParams) => void
    setSearchValue: (searchValue: string) => void
}
export const ResetFilter: React.FC<ResetFilterPropsType> = ({ resetPackListFilter, setSearchValue }) => {
    const resetFilter = () => {
        resetPackListFilter({ user_id: '', packName: '', min: 0, max: 110, sortPacks: '', page: 0, pageCount: 8, block: false })
    }
    return (
        <div className={s.thirdSquare} onClick={resetFilter}>
            <FilterAltOffIcon fontSize={'medium'} onClick={() => setSearchValue('')} />
        </div>
    )
}
