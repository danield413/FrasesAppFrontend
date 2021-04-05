import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { CardPhrase } from '../ui/CardPhrase';
import { Navbar } from '../ui/Navbar'

export const UserScreen = () => {

    const {id} = useParams();
    const {userPhrases} = useSelector(state => state.phrases)
    
    const [state, setState] = useState({
        name: '',
        phrases: []
    })

    const { name, phrases } = state;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user/data/${id}`, {
            headers: {
                'x-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
        .then( res => setState({
            name: res.data.name,
            phrases: res.data.phrases.reverse()
        }) )
    }, [id, userPhrases])

    console.log(phrases);

    if(name === '' && phrases.length === 0){
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
            <Navbar />
            <main className="main-user">
                <div className="main-header">
                    <div>
                        <img src="https://www.personality-database.com/profile_images/3033.png?id=161577" alt="usuario"/>
                    </div>
                </div>
                <h2 className="main-title">{name}</h2>
                <h2 className="main-title sub">Frases Creadas: {phrases.length}</h2>
                <div className="main">
                    {
                        phrases.map((phrase) => (
                            <CardPhrase
                                key={phrase._id}
                                phraseId={ phrase._id }
                                phrase={phrase.phrase}
                                username={phrase.user.name}
                                userId={ phrase.user._id }
                                date={ phrase.date }
                            />
                        ))
                    }
                </div>
            </main>
        </>
    )
}
