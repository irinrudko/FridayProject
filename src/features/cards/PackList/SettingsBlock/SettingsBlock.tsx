import React from 'react'
import { Box, IconButton, InputBase, Paper, Slider } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import s from './SettingsBlock.module.scss'
import Button from '@mui/material/Button'
import { routes } from '../../../../app/routes/Routes'
import { NavLink } from 'react-router-dom'

export const SettingsBlock = () => {
    //////for slider
    const [value, setValue] = React.useState<number[]>([20, 37])

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[])
    }

    return (
        <>
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
                <NavLink to={routes.myPacksList} className={s.navLink}>
                    {' '}
                    {/*временная навигация*/}
                    <Button type={'submit'} variant={'contained'} color={'primary'} style={{ width: '100px' }}>
                        My
                    </Button>
                </NavLink>
                <NavLink to={routes.friendsPacksList} className={s.navLink}>
                    {' '}
                    {/*временная навигация*/}
                    <Button type={'submit'} variant={'contained'} color={'primary'} style={{ width: '100px' }}>
                        All
                    </Button>
                </NavLink>
            </div>

            <div className={s.slider}>
                <div className={s.firstSquare}>2</div>
                <Box sx={{ width: '163px' }}>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        // getAriaValueText={valuetext}
                    />
                </Box>
                <div className={s.secondSquare}>10</div>
                <div className={s.thirdSquare}></div>
            </div>
        </>
    )
}
