import React from 'react'
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux'
import { openPhraseModal } from '../../actions/ui';

export const AddButton = () => {

    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch( openPhraseModal() )
    }

    return (
        <motion.button className="add-btn" onClick={ handleOpenModal } whileTap={{scale:1.2}} whileHover={{scale:1.1}}>
            {/* <i class="fas fa-plus-circle add-icon"></i> */}
            <i className="fas fa-pen-alt"></i>
            Nueva frase
        </motion.button>
    )
}
