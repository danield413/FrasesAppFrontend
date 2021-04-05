import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { startChecking } from '../actions/auth';
import { HomeScreen } from '../components/home/HomeScreen';

import { MyAccount } from '../components/home/MyAccount';
import { Footer } from '../components/ui/Footer';
import { UserScreen } from '../components/user/UserScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth)

    //se verifica el token cada vez que se renderiza de nuevo el AppRouter
    useEffect(() => {
        
        dispatch( startChecking() );

    }, [dispatch]);

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
        <Router>
            <Switch>

                <PublicRoute
                    isAuthenticated={ !!uid }
                    path="/auth"
                    component={ AuthRouter }
                />

                <PrivateRoute
                    isAuthenticated={ !!uid }
                    exact
                    path="/"
                    component={ HomeScreen }
                />

                <PrivateRoute 
                    isAuthenticated={ !!uid }
                    exact
                    path="/my-account"
                    component={ MyAccount }
                />

                <PrivateRoute
                    isAuthenticated={ !!uid }
                    exact
                    path="/user/:id"
                    component={ UserScreen }
                />

                <Redirect to="/auth/login" />

            </Switch>
            <Footer />
        </Router>
    )
}
