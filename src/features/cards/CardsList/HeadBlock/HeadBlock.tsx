import React, { useState } from 'react'
import s from './HeadBlock.module.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { ActionsMenu } from '../ActionsMenu/ActionsMenu'
import Button from '@mui/material/Button'
import { addCardTC } from '../cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { CardType, GetCardsResponseType } from '../../../../api/cardsAPI'
import { routes } from '../../../../app/routes/Routes'
import { NavLink, useParams } from 'react-router-dom'
import { setIdAC } from '../../PackList/table-reducer'

type HeadBlockPropsType = {
    deletePack: (packId: string) => void
    editPack: () => void
    learnPack: () => void
    cardPacks: CardType[]
    userId: string
    packId: string
    packName: string
    myCardPacks: CardType[]
    addCard: () => void
}

const HeadBlock: React.FC<HeadBlockPropsType> = ({
    deletePack,
    editPack,
    learnPack,
    packId,
    userId,
    cardPacks,
    packName,
    myCardPacks,
    addCard,
}) => {
    const [collapsed, setCollapsed] = useState<boolean>(true)
    const dispatch = useAppDispatch()
    const namePack = cardPacks.map((pack) => (pack._id === packId ? packName : ''))
    const { urlPackId } = useParams<string>()

    const onClickHandler = () => {
        setCollapsed(!collapsed)
    }

    const inputClass = !collapsed ? s.active : s.nav

    const setPackId = (id: string, userId: string) => {
        dispatch(setIdAC(id, userId))
    }

    return (
        <div className={s.headBlock}>
            <h2 className={s.headName}>
                {namePack}
                {myCardPacks[0]?.user_id === userId && (
                    <div className={s.menuIcon}>
                        <MoreVertIcon fontSize={'small'} style={{ paddingBottom: '2px' }} onClick={onClickHandler} />
                        <div className={inputClass}>
                            <ActionsMenu deletePack={deletePack} editPack={editPack} learnPack={learnPack} packId={packId} />
                        </div>
                    </div>
                )}
            </h2>
            {myCardPacks[0]?.cardsPack_id && (
                <>
                    {myCardPacks[0]?.user_id === userId ? (
                        <Button type={'submit'} variant={'contained'} color={'primary'} className={s.button} onClick={addCard}>
                            Add new card
                        </Button>
                    ) : (
                        <NavLink to={`/packs/learn/${urlPackId}`}>
                            {/*<NavLink to={routes.learnPack}>*/}
                            <Button type={'submit'} variant={'contained'} color={'primary'} className={s.button}>
                                Learn to pack
                            </Button>
                        </NavLink>
                    )}
                </>
            )}
        </div>
    )
}

export default HeadBlock
