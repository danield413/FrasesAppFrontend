import React, { useState } from 'react';
import { Navbar } from '../ui/Navbar';
import { MyPhrases } from './MyPhrases';
import { MyProfile } from './MyProfile';
import { MySaves } from './MySaves';

export const MyAccount = () => {


    const [ location,  setLocation] = useState('perfil');

    return (
        <>
            <Navbar />
            <main className="main-account">
                <div className="nav-buttons">
                    <button 
                        className={ location === "perfil" ? "nav-btn selected" : "nav-btn" } 
                        onClick={ () => setLocation('perfil') }
                    >
                        <i className="fas fa-cog"></i> <span>Perfil</span>
                    </button>
                    <button 
                        className={ location === "frases" ? "nav-btn selected" : "nav-btn" } 
                        onClick={ () => setLocation('frases') }
                    >
                        <i className="fas fa-user-edit"></i>  <span>Frases creadas</span>
                    </button>
                    <button 
                        className={ location === "guardadas" ? "nav-btn selected" : "nav-btn" } 
                        onClick={ () => setLocation('guardadas') }
                    >
                        <i className="fas fa-bookmark"></i> <span>Guardadas</span>
                    </button>
                </div>
                <div className="main-content">
                    {
                        location === 'perfil' &&
                        <MyProfile />
                    }
                    {
                        location === 'frases' &&
                        <MyPhrases />
                    }
                    {
                        location === 'guardadas' &&
                        <MySaves />
                    }
                </div>
            </main>
        </>
    )
}
