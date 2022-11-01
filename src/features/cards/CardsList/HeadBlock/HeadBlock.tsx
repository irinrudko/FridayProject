import React, { useEffect, useState } from 'react'
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
import { setPackName } from '../../PackList/SettingsBlock/setting-reducer'

type HeadBlockPropsType = {
    deletePack: (packId: string) => void
    editPack: () => void
    learnPack: () => void
    cardPacks: CardType[]
    userId: string
    packName: string
    myCardPacks: CardType[]
    addCard: () => void
}

const HeadBlock: React.FC<HeadBlockPropsType> = React.memo(
    ({ deletePack, editPack, learnPack, userId, cardPacks, packName, myCardPacks, addCard }) => {
        const { urlPackId } = useParams<string>()
        const [collapsed, setCollapsed] = useState<boolean>(true)
        const dispatch = useAppDispatch()

        const onClickHandler = () => {
            setCollapsed(!collapsed)
            console.log(urlPackId)
            console.log(cardPacks[0].user_id)
        }

        const inputClass = !collapsed ? s.active : s.nav

        const [name, setName] = useState('')
        useEffect(() => {
            if (packName === name || packName === '') {
                return
            }
            setName(packName)
        }, [packName])

        return (
            <div className={s.headBlock}>
                <h2 className={s.headName}>
                    {name}
                    {myCardPacks[0]?.user_id === userId && (
                        <div className={s.menuIcon}>
                            <MoreVertIcon fontSize={'small'} style={{ paddingBottom: '2px' }} onClick={onClickHandler} />
                            <div className={inputClass}>
                                <ActionsMenu deletePack={deletePack} editPack={editPack} learnPack={learnPack} />
                            </div>
                        </div>
                    )}
                </h2>
                {myCardPacks[0]?.cardsPack_id && (
                    <>
                        {myCardPacks[0]?.user_id === userId ? (
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                className={s.button}
                                onClick={addCard}
                            >
                                Add new card
                            </Button>
                        ) : (
                            <NavLink to={`/packs/learn/${urlPackId}`}>
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
)

export default HeadBlock
