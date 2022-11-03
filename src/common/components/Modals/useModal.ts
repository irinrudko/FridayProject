import { useState } from 'react'

export const useModal = () => {
    ///packs
    const [addPackModal, setAddPackModal] = useState(false)
    const [editPackModal, setEditPackModal] = useState(false)
    const [removePackModal, setRemovePackModal] = useState(false)

    function toggleAddPackModal() {
        setAddPackModal(!addPackModal)
    }
    function toggleEditPackModal() {
        setEditPackModal(!editPackModal)
    }
    function toggleRemovePackModal() {
        setRemovePackModal(!removePackModal)
    }

    ////cards
    const [addCardModal, addRemoveCardModal] = useState(false)
    const [editCardModal, editRemoveCardModal] = useState(false)
    const [removeCardModal, setRemoveCardModal] = useState(false)

    function toggleRemoveCardModal() {
        setRemoveCardModal(!removeCardModal)
    }
    function toggleAddCardModal() {
        addRemoveCardModal(!addCardModal)
    }
    function toggleEditCardModal() {
        editRemoveCardModal(!editCardModal)
    }

    return {
        addPackModal,
        editPackModal,
        removePackModal,
        removeCardModal,
        addCardModal,
        editCardModal,

        toggleAddPackModal,
        toggleEditPackModal,
        toggleRemovePackModal,
        toggleRemoveCardModal,
        toggleAddCardModal,
        toggleEditCardModal,
    }
}
