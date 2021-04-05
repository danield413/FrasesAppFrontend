import axios from "axios";
import { types } from "../types/types";
import Swal from 'sweetalert2';

export const startGetAllPhrases = () => {
    return async (dispatch) => {

        const resp = await axios.get(`${process.env.REACT_APP_API_URL}/phrases/get`, {
            headers: {
                'x-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
        if( resp.data.ok ){
            dispatch( getAllPhrases( resp.data.msg.reverse() ) )
        }

    }
}

const getAllPhrases = (data) => ({ 
    type: types.phrasesGetAll,
    payload: data
})

export const createNewPhrase = ( phrase ) => {
    return async (dispatch) => {

        const options = {
            headers: {
                'x-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }

        const resp = await axios.post(`${process.env.REACT_APP_API_URL}/phrases/create`,
        {
            phrase,
            date: new Date().getTime()
        },options)

        if( resp.data.ok ){
            dispatch( startGetAllPhrases() );
            Swal.fire('Frase creada ✔');
        }

    }
}

export const startDeletePhrase = ( phraseId ) => {
    return async (dispatch, getState) => {

        Swal.fire({
            title: '¿Deseas eliminar esta frase?',
            text: "Si lo haces no podrás recuperarla",
            icon: 'warning',
            showCancelButton: true,
            // cancelButtonColor: '#d33',
            cancelButtonText: 'No, cancelar',
            // confirmButtonColor: '#3085d6',
            confirmButtonText: 'Si, eliminar'
            }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API_URL}/phrases/delete/${phraseId}`,
                {
                    headers: {
                        'x-token': localStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                })
                .then( res => {
                    if( res.data.ok ){
                        dispatch( deletePhrase( phraseId ) );
                        Swal.fire('Frase eliminada 🗑');
                    }
                })
            }
        })
    }
}

const deletePhrase = ( phraseId ) => ({
    type: types.phrasesDeletedPhrase,
    payload: phraseId
});


export const startGetAllUserPhrases = () => {
    return async (dispatch,getState) => {
        const resp = await axios.get(`${process.env.REACT_APP_API_URL}/user/${getState().auth.uid}`,{
            headers: {
                'x-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
        if( resp.data.ok ){
            dispatch( getAllUserPhrases( resp.data.frases.reverse() ) )
        }
        
    }
}

const getAllUserPhrases = ( data ) => ({
    type: types.phrasesGetAllUser,
    payload: data
})

export const startUpdateUserPhrase = ( phraseToUpdate ) => {
    return async (dispatch, getState) => {
        
        const options = {
            headers: {
                'x-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }
        const resp = await axios.put(`${process.env.REACT_APP_API_URL}/phrases/put/${getState().ui.selectedToUpdate.phraseId}`, {
            phrase: phraseToUpdate,
            date: new Date().getTime()
        }, options)
        if( resp.data.ok ){
            //o se actualizan los datos en redux o simplemente hacemos otra llamada a startGetAllPhrases Y startGetAllUserPhrases
            Swal.fire('Frase actualizada', '', 'success');
            dispatch( startGetAllPhrases() );
            dispatch( startGetAllUserPhrases() );
        }

    }
}

export const startSavePhrase = ( phraseId ) => {
    return async (dispatch) => {

        const options = {
            headers: {
                'x-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }
        const resp = await axios.put(`${process.env.REACT_APP_API_URL}/user/put-new-phrase`,{
            phraseId
        }, options)
        if( resp.data.ok ){
            Swal.fire( resp.data.msg );
            dispatch( startGetAllSavedPhrases() );
        }else {
            dispatch( startRemoveSavedPhrase( phraseId ) )
        }
    }
}

const startRemoveSavedPhrase = ( phraseId ) => {
    return async (dispatch) => {

        const options = {
            headers: {
                'x-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }
        const resp = await axios.put(`${process.env.REACT_APP_API_URL}/user/put-phrase`,{
            phraseId
        }, options)
        if( resp.data.ok ){
            Swal.fire( resp.data.msg );
            dispatch( startGetAllSavedPhrases() );
        }
    }
}

export const startGetAllSavedPhrases = () => {
    return async (dispatch, getState) => {

        const resp = await axios.get(`${process.env.REACT_APP_API_URL}/user/get-saved-phrases/${getState().auth.uid}`, {
            headers: {
                'x-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
        if( resp.data.ok ){
            dispatch( getAllSavedPhrases( resp.data.savedPhrases.reverse() ) )
        }
        
    }
}

const getAllSavedPhrases = ( data ) => ({
    type: types.phrasesGetSaved,
    payload: data
})