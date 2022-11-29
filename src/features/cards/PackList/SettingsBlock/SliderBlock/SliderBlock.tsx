import React, { useEffect } from 'react'
import s from '../SettingsBlock.module.scss'
import { Box, Slider } from '@mui/material'
import { useAppSelector } from '../../../../../app/store'
import { ResetFilter } from './ResetFilter/ResetFilter'
import { GetPackParams } from '../../../../../api/packsAPI'
import { useDebouce } from '../../../../../common/assets/Hook/useDebouce'

type SliderBlockPropsType = {
    resetPackListFilter: (data: GetPackParams) => void
    filterWithSlider: (value: GetPackParams) => void
    setSearchValue: (searchValue: string) => void
}
export const SliderBlock: React.FC<SliderBlockPropsType> = ({ resetPackListFilter, filterWithSlider, setSearchValue }) => {
    const minValue = useAppSelector((state) => state.setting.min)
    const maxValue = useAppSelector((state) => state.setting.max)
    const user_id = useAppSelector((state) => state.setting.user_id)

    const [value, setValue] = React.useState<number[]>([0, 110])
    useEffect(() => {
        setValue([minValue, maxValue])
    }, [minValue, maxValue])
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[])
    }
    const debounce = useDebouce<number[]>(value, 500)
    useEffect(() => {
        filterWithSlider({ min: value[0], max: value[1], user_id, page: 1 })
    }, [debounce])
    // const setSliderValueHandler = () => {
    //     filterWithSlider({ min: value[0], max: value[1], user_id, page:1 })
    // }
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
                    // onMouseUp={setSliderValueHandler}
                />
            </Box>
            <div className={s.secondSquare}>{value[1]}</div>
            <ResetFilter resetPackListFilter={resetPackListFilter} setSearchValue={setSearchValue} />
        </div>
    )
}
