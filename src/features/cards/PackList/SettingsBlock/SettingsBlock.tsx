import React, { useEffect } from 'react'
import { Box, IconButton, InputBase, Paper, Slider } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import s from './SettingsBlock.module.scss'
import Button from '@mui/material/Button'
import { routes } from '../../../../app/routes/Routes'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { GetPackParams } from '../../../../api/packsAPI'
import { getPacksTC } from '../../packs-reducer'

type SettingsPropsType = {
    setMyPack: (value: boolean) => void
}

export const SettingsBlock: React.FC<SettingsPropsType> = ({ setMyPack }) => {
    // const dispatch = useAppDispatch()
    // const userId = useAppSelector(store => store.auth.user._id)
    // const myCardPacks = useAppSelector(store => store.packs.cardPacks)

    const [value, setValue] = React.useState<number[]>([10, 30])

    const changePack = (type: string) => {
        if (type === 'my') {
            setMyPack(true)
        } else {
            setMyPack(false)
        }
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[])
    }

    return (
        <div className={s.settingsBlock}>
            <div className={s.descriptionBlock}>
                <span>Search</span>
                <span className={s.second}>Show packs cards</span>
                <span className={s.third}>Number of cards</span>
            </div>
            <Paper
                component="form"
                sx={{ display: 'flex', alignItems: 'center', width: '410px', height: '36px', marginRight: '22px' }}
            >
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Provide your text"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
            </Paper>
            <div className={s.settingButton}>
                <Button
                    type={'submit'}
                    variant={'outlined'}
                    color={'inherit'}
                    style={{ width: '100px' }}
                    onClick={() => changePack('my')}
                >
                    My
                </Button>
                {/*</NavLink>*/}
                {/*<NavLink to={routes.friendsPacksList} className={s.navLink}>*/} {/*временная навигация*/}
                <Button
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                    style={{ width: '100px' }}
                    onClick={() => changePack('all')}
                >
                    All
                </Button>
                {/*</NavLink>*/}
            </div>

            <div className={s.slider}>
                <div className={s.firstSquare}>{value[0]}</div>
                <Box sx={{ width: '163px' }}>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={52}
                        step={1}
                        // getAriaValueText={valuetext}
                    />
                </Box>
                <div className={s.secondSquare}>{value[1]}</div>
                <div className={s.thirdSquare}></div>
            </div>
        </div>
    )
}
