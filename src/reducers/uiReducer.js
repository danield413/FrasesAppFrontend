import { types } from "../types/types";

const initialState = {
    modal: false,
    updateModal: false,
    selectedToUpdate: {
        phrase: '',
        date: new Date().getTime(),
        username: '',
        userId: '',
        phraseId: ''
    }
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
           
        case types.uiOpenPhraseModal:
            return{
                ...state,
                modal: true
            }
        case types.uiClosePhraseModal:
            return{
                ...state,
                modal: false
            }
        case types.uiOpenUpdatePhraseModal:
            return{
                ...state,
                updateModal: true,
                selectedToUpdate: action.payload
            }
        case types.uiCloseUpdatePhraseModal:
            return{
                ...state,
                updateModal: false,
                selectedToUpdate: {}
            }
        default:
            return state;
    }
}
