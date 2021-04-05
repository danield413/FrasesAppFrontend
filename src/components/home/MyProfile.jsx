import React, { useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import { startChangeName, startChangePassword } from '../../actions/auth';

export const MyProfile = () => {

    const { name, email } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [ formValues, handleInputChange, reset] = useForm({
        newName: '',
        newPassword: ''
    })

    const [ nameIsOpen ,  setNameIsOpen ] = useState(false)
    const [ passwordIsOpen ,  setPasswordIsOpen ] = useState(false)

    const { newName, newPassword } = formValues;

    const handleNameOpen = () => {
        setNameIsOpen(!nameIsOpen)
        setPasswordIsOpen(false)
    }

    const handlePasswordOpen = () => {
        setPasswordIsOpen(!passwordIsOpen)
        setNameIsOpen(false)
    }

    const handleUpdateName = (e) => {
        e.preventDefault();
        if( newName.length <= 3 ){
            Swal.fire('Ingresa algo... mínimo 3 carácteres');
            reset();
        } else if( newName.toLowerCase() === name.toLowerCase() ){
            Swal.fire('No puedes actualizar tu mismo nombre :P');
            reset();
        } else {
            dispatch( startChangeName( newName  ) )
        }
    }

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        if( newPassword.length < 8 ){
            Swal.fire('La contraseña debe ser de mínimo 8 carácteres');
            reset();
        } else if(newPassword.length === 0 ){
            Swal.fire('Debes ingresar algo...');
            reset();
        } else if(newPassword === ''){
            Swal.fire('Ingresa algo... mínimo 8 carácteres');
            reset();
        } else {
            dispatch( startChangePassword( newPassword ) )
        }
    }


    return (
        <div className="main-content-profile">
            <h2 className="profile-title"><i className="fas fa-cog"></i> Configuración de perfil</h2>
            <div className="profile-flex">
                <div className="profile-box">
                    <p><strong>Nombre:</strong></p>
                    <p className="profile-info"> @{name} </p>
                    <p><strong>Correo electrónico:</strong></p>
                    <p className="profile-info"> {email} </p>

                    <motion.button
                        className="profile-btn-modal" 
                        whileTap={{ scale:1.1 }}
                        onClick={ handleNameOpen }
                    >
                        Actualizar nombre {!nameIsOpen ? <i className="fas fa-chevron-circle-down"></i> : <i className="fas fa-chevron-circle-up"></i>}
                    </motion.button>

                    { nameIsOpen &&
                    <form className="profile-form" onSubmit={ handleUpdateName }>
                        <input 
                        type="text" 
                        className="profile-input" 
                        placeholder="Nuevo nombre"
                        name="newName"
                        onChange={ handleInputChange }
                        value={newName}
                        autoComplete="off"
                        />
                        <button type="submit" className="profile-submit">Guardar</button>
                    </form>
                    }

                    <motion.button 
                    className="profile-btn-modal" 
                    whileTap={{ scale:1.1 }} 
                    onClick={ handlePasswordOpen }
                    >
                        Actualizar contraseña {!passwordIsOpen ? <i className="fas fa-chevron-circle-down"></i> : <i className="fas fa-chevron-circle-up"></i>}
                    </motion.button>

                    { passwordIsOpen &&
                    <form className="profile-form" onSubmit={ handleUpdatePassword }>
                        <input 
                        type="password" 
                        className="profile-input" 
                        placeholder="Nueva contraseña"
                        name="newPassword"
                        onChange={ handleInputChange }
                        value={newPassword}
                        />
                        <button type="submit" className="profile-submit">Guardar</button>
                    </form>
                    }

                </div>
            </div>
        </div>
    )
}
