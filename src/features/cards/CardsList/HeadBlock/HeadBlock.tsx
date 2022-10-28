import React, { useState } from 'react'
import s from './HeadBlock.module.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { ActionsMenu } from '../ActionsMenu/ActionsMenu'
import Button from '@mui/material/Button'
import { addCardTC } from '../../cards-reducer'
import { useAppDispatch, useAppSelector } from '../../../../app/store'
import { CardType, GetCardsResponseType } from '../../../../api/cardsAPI'

type HeadBlockPropsType = {
    deletePack: (packId: string) => void
    editPack: () => void
    learnPack: () => void
    cardPacks: CardType[]
    userId: string
    packId: string
    id: string
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
    const namePack = cardPacks.map((pack) => (pack._id === packId ? packName : ''))

    const onClickHandler = () => {
        setCollapsed(!collapsed)
    }

    const inputClass = !collapsed ? s.active : s.nav

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
                        <Button type={'submit'} variant={'contained'} color={'primary'} className={s.button} onClick={() => {}}>
                            Learn to pack
                        </Button>
                    )}
                </>
            )}
        </div>
    )
}

export default HeadBlock
