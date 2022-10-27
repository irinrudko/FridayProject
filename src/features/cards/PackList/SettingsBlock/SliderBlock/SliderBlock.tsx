import React, { useEffect } from 'react'
import s from '../SettingsBlock.module.scss'
import { Box, Slider } from '@mui/material'
import { useAppSelector } from '../../../../../app/store'
import { ResetFilter } from './ResetFilter/ResetFilter'
import { InitialStateSettingType } from '../setting-reducer'
import { GetPackParams } from '../../../../../api/packsAPI'

type SliderBlockPropsType = {
    resetPackListFilter: (data: GetPackParams) => void
    filterWithSlider: (value: GetPackParams) => void
}
export const SliderBlock: React.FC<SliderBlockPropsType> = ({ resetPackListFilter, filterWithSlider }) => {
    const minValue = useAppSelector((state) => state.setting.min)
    const maxValue = useAppSelector((state) => state.setting.max)
    const user_id = useAppSelector((state) => state.setting.user_id)
    const pageCount = useAppSelector((state) => state.setting.pageCount)

    const [value, setValue] = React.useState<number[]>([0, 110])
    useEffect(() => {
        setValue([minValue, maxValue])
    }, [minValue, maxValue])
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[])
    }

    const setSliderValueHandler = () => {
        filterWithSlider({ min: value[0], max: value[1], pageCount, user_id })
    }
    return (
        <div className={s.slider}>
            <div className={s.firstSquare}>{value[0]}</div>
            <Box sx={{ width: '163px' }}>
                <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={110}
                    step={1}
                    onMouseUp={setSliderValueHandler}
                />
            </Box>
            <div className={s.secondSquare}>{value[1]}</div>
            <ResetFilter resetPackListFilter={resetPackListFilter} />
        </div>
    )
}
