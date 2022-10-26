import React, { useEffect } from 'react'
import s from '../SettingsBlock.module.scss'
import Button from '@mui/material/Button'
import { useAppDispatch, useAppSelector } from '../../../../../app/store'
import { getPacksTC } from '../../../packs-reducer'

type FilterPropsType = {
    setMyPack: (value: boolean) => void
}
export const Filter: React.FC<FilterPropsType> = ({ setMyPack }) => {
    const dispatch = useAppDispatch()
    const myId = useAppSelector((state) => state.auth.user._id)
    const user_id = useAppSelector((state) => state.setting.user_id)

    const [disableButton, setDisableButton] = React.useState<boolean[]>([false, true])

    const showMyPackHandler = () => {
        dispatch(getPacksTC({ user_id: myId, pageCount: 8 }))
        setDisableButton([true, false])
    }

    const showAllPackHandler = () => {
        dispatch(getPacksTC({ user_id: '', pageCount: 8 }))

        setDisableButton([false, true])
    }
    return (
        <div className={s.settingButton}>
            <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                disabled={disableButton[0]}
                style={{ width: '100px' }}
                onClick={showMyPackHandler}
            >
                My
            </Button>

            <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                disabled={disableButton[1]}
                style={{ width: '100px' }}
                onClick={showAllPackHandler}
            >
                All
            </Button>
        </div>
    )
}
