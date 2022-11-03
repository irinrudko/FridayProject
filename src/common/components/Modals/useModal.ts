import { useState } from 'react'

export const useModal = () => {
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

    return {
        addPackModal,
        editPackModal,
        removePackModal,
        toggleAddPackModal,
        toggleEditPackModal,
        toggleRemovePackModal,
    }
}
