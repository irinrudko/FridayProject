import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from '../../../../../app/routes/Routes'
import s from '../SettingsBlock.module.scss'
import Button from '@mui/material/Button'
import { useAppSelector } from '../../../../../app/store'

type FilterPropsType = {
    setMyPack: (value: boolean) => void
}
export const Filter: React.FC<FilterPropsType> = ({ setMyPack }) => {
    const userId = useAppSelector((state) => state.setting.user_id)
    useEffect(() => {
        if (userId === '') {
            setDisableButton([false, true])
        }
    }, [userId])
    const [disableButton, setDisableButton] = React.useState<boolean[]>([false, true])
    const changePack = (type: string) => {
        if (type === 'my') {
            setMyPack(true)
            setDisableButton([true, false])
        } else {
            setMyPack(false)
            setDisableButton([false, true])
        }
    }

    return (
        <div className={s.settingButton}>
            <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                disabled={disableButton[0]}
                style={{ width: '100px' }}
                onClick={() => changePack('my')}
            >
                My
            </Button>

            <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                disabled={disableButton[1]}
                style={{ width: '100px' }}
                onClick={() => changePack('all')}
            >
                All
            </Button>
        </div>
    )
}
