import axios from "axios"
import { types } from "../types/types";
import Swal from 'sweetalert2';

export const startRegister = ( name, email, password ) => {
    return async(dispatch) => {
        const resp = await axios.post(`${process.env.REACT_APP_API_URL}/auth/new-user`,{
            name,
            email,
            password
        })
        if( resp.data.ok ){
            localStorage.setItem('token', resp.data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            Swal.fire('¡Hola!', 'Bienvenid@ a la comunidad', 'success');

            dispatch( login({
                uid: resp.data.uid,
                name: resp.data.name,
                email: resp.data.email
            }))

        } else {
            Swal.fire('Error', resp.data.msg, 'error')
        }
    }
}



export const startLogin = ( email, password ) => {
    return async (dispatch) => {

        const resp = await axios.post(`${process.env.REACT_APP_API_URL}/auth/`,{
            email,
            password,
        })
        if( resp.data.ok ){
            localStorage.setItem('token', resp.data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            Swal.fire('¡Es un gusto tenerte aquí de nuevo! 👻');

            dispatch( login({
                uid: resp.data.uid,
                name: resp.data.name,
                email: resp.data.email
            }))
        } else {
            Swal.fire('Error', 'Datos incorrectos', 'error')
        }
    }
}

const login = ( data ) => ({
    type: types.authLogin,
    payload: data
})

export const startChecking = () => {
    return async (dispatch) => {
        //se manda el contenido del LS y verifica si hay token, si hay y es válido lo renueva e inicia sesión, si no hay no deja ingresar
        const resp = await axios.get(`${process.env.REACT_APP_API_URL}/auth/renew`, {
            headers: {
                'x-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        });
        if( resp.data.ok ){
            localStorage.setItem('token', resp.data.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: resp.data.uid,
                name: resp.data.name,
                email: resp.data.email
            }) )
        } else {
            dispatch( checkingFinish() );
        }
        
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch( logout() );
        dispatch( logoutPhrases() );
    }
}

const logout = () => ({type: types.authLogout})

const logoutPhrases = () => ({
    type: types.phrasesLogout
})

export const startChangeName = ( name ) => {
    return async (dispatch, getState) => {

        const options = {
            headers: {
                'x-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }

        const resp = await axios.put(`${process.env.REACT_APP_API_URL}/user/change-name/${getState().auth.uid}`, {
            name
        }, options);
        if( resp.data.ok ){
            dispatch( changeName( resp.data.msg.name ) )
            Swal.fire('Tu nombre ha sido cambiado', '', 'success')
            dispatch( startCreateNewJWT( resp.data.msg.name ) )
        }

    }
}

const changeName = ( data ) => ({
    type: types.authChangeName,
    payload: data
})

export const startChangePassword = ( password ) => {
    return async (dispatch, getState) => {

        const options = {
            headers: {
                'x-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }

        const resp = await axios.put(`${process.env.REACT_APP_API_URL}/user/change-password/${getState().auth.uid}`, {
            password
        }, options);
        if( resp.data.ok ){
            Swal.fire( resp.data.msg, 'Vuelve a iniciar sesión', "success" );
            dispatch( startLogout() );
        }
    }
}


//crea un nuevo JWT cuando el nombre es actualizado en el startChangeName
const startCreateNewJWT = ( newName ) => {
    return async (dispatch, getState) => {

        const options = {
            headers: {
                'x-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }

        //crear un nuevo JWT con el nuevo nombre que actualizó el usuario
         const resp = await axios.post(`${process.env.REACT_APP_API_URL}/auth/renew-change-name`, {
            uid: getState().auth.uid,
            name: newName,
            email: getState().auth.email
        } , options);
        if( resp.data.ok ){
            localStorage.setItem('token', resp.data.newToken)
        }
    }
}