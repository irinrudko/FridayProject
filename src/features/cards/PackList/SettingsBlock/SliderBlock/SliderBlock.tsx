import React, { useEffect } from 'react'
import s from '../SettingsBlock.module.scss'
import { Box, Slider } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { getPacksTC } from '../../../packs-reducer'
import ResetFilter from './ResetFilter/ResetFilter'

export const SliderBlock = () => {
    const minValue = useAppSelector((state) => state.setting.min)
    const maxValue = useAppSelector((state) => state.setting.max)
    const user_id = useAppSelector((state) => state.setting.user_id)
    const pageCount = useAppSelector((state) => state.setting.pageCount)
    useEffect(() => {
        setValue([minValue, maxValue])
    }, [minValue, maxValue])

    const dispatch = useAppDispatch()
    const [value, setValue] = React.useState<number[]>([minValue, maxValue])
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[])
    }

    const setSliderValueHandler = () => {
        dispatch(getPacksTC({ min: value[0], max: value[1], pageCount, user_id }))
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
                    // getAriaValueText={valuetext}
                />
            </Box>
            <div className={s.secondSquare}>{value[1]}</div>
            <ResetFilter />
        </div>
    )
}
