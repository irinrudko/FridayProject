import React from 'react'
import s from '../SettingsBlock.module.scss'
import Button from '@mui/material/Button'
import { useAppSelector } from '../../../../../app/store'

type FilterPropsType = {
    setFilterPack: (user_id: string, page: number) => void
}
export const Filter: React.FC<FilterPropsType> = ({ setFilterPack }) => {
    const myId = useAppSelector((state) => state.auth.user._id)

    const [disableButton, setDisableButton] = React.useState<boolean[]>([false, true])

    const showMyPackHandler = () => {
        setFilterPack(myId, 1)
        setDisableButton([true, false])
    }

    const showAllPackHandler = () => {
        setFilterPack('', 1)
        setDisableButton([false, true])
    }
    return (
        <div className={s.buttonsContainer}>
            <Button
                type={'submit'}
                variant={'contained'}
                disabled={disableButton[0]}
                className={s.button}
                onClick={showMyPackHandler}
            >
                My
            </Button>

            <Button
                type={'submit'}
                variant={'contained'}
                disabled={disableButton[1]}
                className={s.button}
                onClick={showAllPackHandler}
            >
                All
            </Button>
        </div>
    )
}
