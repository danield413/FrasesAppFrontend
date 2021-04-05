import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { closePhraseModal } from '../../actions/ui';
import { GrClose } from 'react-icons/gr';
import { useForm } from '../../hooks/useForm';
import { createNewPhrase } from '../../actions/phrases';

const Modal = () => {

  const dispatch = useDispatch();

  const [ formValues , handleInputChange ] = useForm({
    phrase: '',
  })

  const { phrase } = formValues;

  const handleClose = () => {
    dispatch( closePhraseModal() );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //VALIDACIONES
    dispatch( createNewPhrase(phrase) );
    dispatch( closePhraseModal() );
}

    const [ chars, setChars ] = useState(0);
    const [ disabled, setDisabled ] = useState(true);

    useEffect(() => {
       
      setChars(phrase.length);
      if( phrase.length >= 0 && phrase.length <= 15 ){
          setDisabled(true);
      } else {
          setDisabled(false);
      }
      if( phrase.length > 150 ){
          setDisabled(true);
      }

  }, [phrase])

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
            <h2>Nueva frase</h2>
              <form onSubmit={handleSubmit}>
                  <textarea 
                      name="phrase" 
                      className="phrase" 
                      placeholder="Escribe tu frase"
                      onChange={  handleInputChange }
                      value={ phrase }
                  ></textarea>
                  <span className="chars">{chars} / 150</span>
                  <motion.button className="submit" type="submit" disabled={ disabled } whileTap={{scale:1.1}}>
                      Publicar
                  </motion.button>
              </form>
        </div>
      </div>
    </>
  )
}

export default function ModalPortal(){
  return ReactDOM.createPortal(<Modal />, document.getElementById('modal-root'))
}