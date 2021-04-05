import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetAllSavedPhrases } from '../../actions/phrases'
import { CardPhrase } from '../ui/CardPhrase'

export const MySaves = () => {

    const [checking, setChecking] = useState(true);
    const { userSavedPhrases } = useSelector(state => state.phrases)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch( startGetAllSavedPhrases() )
        setChecking(false)
    }, [dispatch])


    if( checking ) {
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
        <div className="main-phrases">
        <div className="phrases-header">
                <span><i className="fas fa-chevron-circle-down"></i> Tus guardadas</span>
            </div>
            {
                userSavedPhrases.map( phrase => (
                    <CardPhrase key={phrase._id} phrase={phrase.phrase} date={phrase.date}  userId={phrase.user} phraseId={phrase._id}/>
                ) )
            }
        </div>
    )
}
