import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { closeUpdatePhraseModal } from '../../actions/ui';
import { GrClose } from 'react-icons/gr';
import { useForm } from '../../hooks/useForm';
import { startUpdateUserPhrase } from '../../actions/phrases';

const ModalUpdate = () => {

  const dispatch = useDispatch();
  const { selectedToUpdate } = useSelector(state => state.ui)

  const [ formValues , handleInputChange ] = useForm({
    phraseToUpdate: selectedToUpdate.phrase,
  })

  const { phraseToUpdate } = formValues;

  const handleClose = () => {
    dispatch( closeUpdatePhraseModal() );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //VALIDACIONES
    dispatch( startUpdateUserPhrase(phraseToUpdate) );
    dispatch( closeUpdatePhraseModal() );
    }

    const [ chars, setChars ] = useState(0);
    const [ disabled, setDisabled ] = useState(true);

    useEffect(() => {
       
      setChars(phraseToUpdate.length);
      if( phraseToUpdate.length >= 0 && phraseToUpdate.length <= 5 ){
          setDisabled(true);
      } else {
          setDisabled(false);
      }
      if( phraseToUpdate.length > 150 ){
          setDisabled(true);
      }

  }, [phraseToUpdate])

  return (
    <>
      <div className="modal">
        <div 
          className="modal-content animate__animated animate__fadeIn"
        >
          <motion.button 
            className="modal-close" 
            onClick={ handleClose } 
            whileTap={{scale:1.2}}
            whileHover={{scale:1.2}}
          ><GrClose /></motion.button>
            <h2>Actualizar frase</h2>
              <form onSubmit={handleSubmit}>
                  <textarea 
                      name="phraseToUpdate" 
                      className="phrase" 
                      placeholder="Escribe tu frase"
                      onChange={  handleInputChange }
                      value={ phraseToUpdate }
                  ></textarea>
                  <span className="chars">{chars} / 150</span>
                  <motion.button className="submit" type="submit" disabled={ disabled } whileTap={{scale:1.1}}>
                      Guardar
                  </motion.button>
              </form>
        </div>
      </div>
    </>
  )
}

export default function ModalPortal(){
  return ReactDOM.createPortal(<ModalUpdate />, document.getElementById('modal-root'))
}