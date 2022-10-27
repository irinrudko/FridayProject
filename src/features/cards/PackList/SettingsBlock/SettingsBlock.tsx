import React from 'react'
import s from './SettingsBlock.module.scss'
import { Search } from '../../../../common/components/Search/Search'
import { SliderBlock } from './SliderBlock/SliderBlock'
import { Filter } from './Filter/Filter'
import { getPacksTC } from '../../packs-reducer'

type SettingsPropsType = {
    setMyPack: (value: boolean) => void
}

export const SettingsBlock: React.FC<SettingsPropsType> = ({ setMyPack }) => {
    return (
        <div className={s.settingsBlock}>
            <div className={s.descriptionBlock}>
                <span>Search</span>
                <span className={s.second}>Show packs cards</span>
                <span className={s.third}>Number of cards</span>
            </div>
            <Search getThunk={getPacksTC} />
            <Filter setMyPack={setMyPack} />
            <SliderBlock />
        </div>
    )
}
