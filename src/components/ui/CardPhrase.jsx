import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { useSelector, useDispatch} from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { startDeletePhrase, startGetAllPhrases, startSavePhrase } from '../../actions/phrases';
import { openUpdatePhraseModal } from '../../actions/ui';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const CardPhrase = ({phrase, date, username, userId, phraseId}) => {
    
    const dispatch = useDispatch();
    const { uid } = useSelector(state => state.auth);
    
    useEffect(() => {
        dispatch( startGetAllPhrases() );
        AOS.init();
        AOS.refresh();
    }, [dispatch])

    const usernameAxios = useRef('')

    useEffect(() => {
        if( username === undefined ){
            axios.get(`${process.env.REACT_APP_API_URL}/user/name/${userId}`, {
                headers: {
                    'x-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            })
            .then( res => usernameAxios.current = res.data.name)
            .catch(err => console.log(err))
        }
    }, [username, userId])

    const newDate = moment(date).format('DD/MM/YYYY');

    const handleCopy = () => {
        navigator.clipboard.writeText( phrase )
        Swal.fire('Frase copiada 👻')
    }

    const handleDelete = () => {
        dispatch( startDeletePhrase( phraseId )  );
    }

    const handleOpen = () => {
        dispatch( openUpdatePhraseModal({
            phrase,
            date,
            username,
            userId,
            phraseId
        }) );
    }

    const handleSave = () => {
        dispatch( startSavePhrase( phraseId ) );
    }

    const profileUrl = `/user/${userId}`;

    if( usernameAxios === ''){
        return(
            <div className="flexible">
                <div className="sk-chase">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                </div>
            </div>
        )
    }

    return (
       <>
            <div className="card-wrapper">
                <article>
                    <div className="card animate__animated animate__fadeIn" >
                        <div className="card-header">
                            { username !== undefined
                            ? <Link className="to" to={profileUrl}><span><i className="fas fa-user-circle"></i> @{username} {(userId === uid ? "(Tú)" : "")} </span></Link>
                            : <Link className="to" to={profileUrl}><span><i className="far fa-id-card"></i> Ver creador</span></Link>
                            //<Link to={profileUrl}><span>@{usernameAxios.current}</span></Link>
                            }
                            <p>{newDate}</p>
                        </div>
                        <div className="card-body">
                            "{phrase}"
                        </div>
                        <div className="card-footer">
                        { userId === uid &&
                        <motion.button 
                                className="card-btn"
                                whileTap={{scale:1.2}} 
                                whileHover={{scale:1.2}}
                                onClick={ handleDelete }
                            >
                                <i className="fas fa-trash-alt"></i>
                            </motion.button>}
                            { userId === uid &&
                            <motion.button 
                                className="card-btn"
                                whileTap={{scale:1.2}} 
                                whileHover={{scale:1.2}}
                                onClick={ handleOpen }
                            >
                                <i className="fas fa-edit"></i>
                            </motion.button>}                    
                            <motion.button 
                                className="card-btn"
                                whileTap={{scale:1.2}} 
                                whileHover={{scale:1.2}}
                                onClick={ handleCopy }
                            >
                                <i className="fas fa-copy"></i>
                            </motion.button>
                            { userId !== uid &&
                                <motion.button 
                                    className="card-btn"
                                    whileTap={{scale:1.2}} 
                                    whileHover={{scale:1.2}}
                                    onClick={ handleSave }
                                >
                                    <i className="fas fa-bookmark"></i>
                                </motion.button>}
                        </div>
                    </div>
                </article>
            </div>
       </>
    )
}
