import React from 'react'
import s from './SettingsBlock.module.scss'
import { Search } from '../../../../common/components/Search/Search'
import { SliderBlock } from './SliderBlock/SliderBlock'
import { Filter } from './Filter/Filter'
import { GetPackParams } from '../../../../api/packsAPI'

type SettingsPropsType = {
    searchPack: (searchPack: string) => void
    setFilterPack: (user_id: string, page: number) => void
    resetPackListFilter: (data: GetPackParams) => void
    filterWithSlider: (value: GetPackParams) => void
}

export const SettingsBlock: React.FC<SettingsPropsType> = ({
    searchPack,
    setFilterPack,
    resetPackListFilter,
    filterWithSlider,
}) => {
    const searchStyle = { display: 'flex', alignItems: 'center', width: '410px', height: '36px', marginRight: '22px' }

    const [searchValue, setSearchValue] = React.useState('')

    return (
        <div className={s.settingsBlock}>
            <div className={s.descriptionBlock}>
                <span>Search</span>
                <span className={s.second}>Show packs cards</span>
                <span className={s.third}>Number of cards</span>
            </div>
            <Search searchStyle={searchStyle} searchPack={searchPack} setSearchValue={setSearchValue} searchValue={searchValue} />
            <Filter setFilterPack={setFilterPack} />
            <SliderBlock
                filterWithSlider={filterWithSlider}
                resetPackListFilter={resetPackListFilter}
                setSearchValue={setSearchValue}
            />
        </div>
    )
}
