import { types } from "../types/types";

export const openPhraseModal = () => ({
    type: types.uiOpenPhraseModal
})


export const closePhraseModal = () => ({
    type: types.uiClosePhraseModal
})

export const openUpdatePhraseModal = ( data ) => ({
    type: types.uiOpenUpdatePhraseModal,
    payload: data
})


export const closeUpdatePhraseModal = () => ({
    type: types.uiCloseUpdatePhraseModal
})
