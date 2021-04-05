import { types } from "../types/types";

const initialState = {
    phrases: [],
    userPhrases: [],
    userSavedPhrases: []
}

export const phrasesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.phrasesGetAll:
            return{
                ...state,
                phrases: action.payload
            }
        case types.phrasesDeletedPhrase:
            return{
                ...state,
                phrases: state.phrases.filter( phrase => phrase._id !== action.payload ),
                userPhrases: state.userPhrases.filter( userPhrase => userPhrase._id !== action.payload )
            }
        case types.phrasesGetAllUser:
            return{
                ...state,
                userPhrases: action.payload
            }
        case types.phrasesGetSaved:
            return{
                ...state,
                userSavedPhrases: action.payload
            }
        case types.phrasesLogout:
            return{
                phrases: [],
                userPhrases: [],
                userSavedPhrases: []
            }
        default:
            return state;
    }
}
