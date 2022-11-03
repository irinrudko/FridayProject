import React, { useEffect, useState } from 'react'
import s from './HeadBlock.module.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { ActionsMenu } from '../ActionsMenu/ActionsMenu'
import Button from '@mui/material/Button'
import { useAppDispatch } from '../../../../app/store'
import { CardType } from '../../../../api/cardsAPI'
import { NavLink, useParams } from 'react-router-dom'
import { useModal } from '../../../../common/components/Modals/useModal'
import { AddCardModal } from '../../../../common/components/Modals/cardsModals/AddCardModal'

type HeadBlockPropsType = {
    deletePack: (packId: string) => void
    editPack: () => void
    learnPack: () => void
    userId: string
    packName: string
    myCardPacks: CardType[]
    addCard: () => void
    packUserId: string
}

const HeadBlock: React.FC<HeadBlockPropsType> = React.memo(
    ({ deletePack, editPack, learnPack, userId, packUserId, packName, myCardPacks, addCard }) => {
        const { addCardModal, toggleAddCardModal } = useModal()

        const { urlPackId } = useParams<string>()
        const [collapsed, setCollapsed] = useState<boolean>(true)
        const dispatch = useAppDispatch()

        const onClickHandler = () => {
            setCollapsed(!collapsed)
            console.log(myCardPacks[0].user_id)
            console.log(userId)
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
                    {packUserId === userId && (
                        <div className={s.menuIcon}>
                            <MoreVertIcon fontSize={'small'} style={{ paddingBottom: '2px' }} onClick={onClickHandler} />
                            <div className={inputClass}>
                                <ActionsMenu deletePack={deletePack} editPack={editPack} learnPack={learnPack} />
                            </div>
                        </div>
                    )}
                </h2>
                {packUserId && (
                    <>
                        {packUserId === userId ? (
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                color={'primary'}
                                className={s.button}
                                onClick={toggleAddCardModal}
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
                <AddCardModal title={'Add new card'} packId={urlPackId!} isShowing={addCardModal} hide={toggleAddCardModal} />
            </div>
        )
    }
)

export default HeadBlock
