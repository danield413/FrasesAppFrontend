import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetAllPhrases } from '../../actions/phrases'
import { AddButton } from '../ui/AddButton'
import { CardPhrase } from '../ui/CardPhrase'
import  Modal from '../ui/Modal'
import ModalUpdate from '../ui/ModalUpdate';
import { Navbar } from '../ui/Navbar'

export const HomeScreen = () => {

    const dispatch = useDispatch();
    const { phrases } = useSelector(state => state.phrases);
    const { modal, updateModal} = useSelector( state => state.ui);

    useEffect(() => {
        
        dispatch( startGetAllPhrases() )

    }, [dispatch]);


    return (
        <>
            <Navbar />
            { updateModal &&
            <ModalUpdate />}
            { modal &&
            <Modal />}
            <AddButton />
            <main className="main">
                <div className="home-header">
                    <span><i className="fas fa-chevron-circle-down"></i> Último contenido</span>
                </div>
                {
                    phrases.map( phrase => (
                        <CardPhrase key={phrase._id} phrase={phrase.phrase} date={phrase.date} username={phrase.user.name} userId={phrase.user._id} phraseId={phrase._id}/>
                    ) )
                }
            </main>
        </>
    )
}
