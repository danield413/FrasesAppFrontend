import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGetAllUserPhrases } from '../../actions/phrases';
import { CardPhrase } from '../ui/CardPhrase';
import ModalUpdate from '../ui/ModalUpdate';

export const MyPhrases = () => {

    const dispatch = useDispatch();
    const { uid } = useSelector(state => state.auth);
    const { userPhrases } = useSelector(state => state.phrases)
    const { updateModal} = useSelector( state => state.ui);

    useEffect(() => {
       
        dispatch( startGetAllUserPhrases() )

    }, [dispatch, uid])

    return (
        <>  
            {updateModal &&
            <ModalUpdate />}
            <div className="main-phrases">
                <div className="phrases-header">
                    <span><i className="fas fa-chevron-circle-down"></i> Tus creaciones</span>
                </div>
                {
                    userPhrases.map( phrase => (
                        <CardPhrase key={phrase._id} phrase={phrase.phrase} date={phrase.date} username={phrase.user.name} userId={phrase.user._id} phraseId={phrase._id}/>
                    ) )
                }
            </div>
        </>
    )
}
