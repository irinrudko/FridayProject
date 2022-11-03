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
    const [removeCardModal, setRemoveCardModal] = useState(false)

    function toggleRemoveCardModal() {
        setRemoveCardModal(!removeCardModal)
    }

    return {
        addPackModal,
        editPackModal,
        removePackModal,
        removeCardModal,
        toggleAddPackModal,
        toggleEditPackModal,
        toggleRemovePackModal,
        toggleRemoveCardModal,
    }
}
