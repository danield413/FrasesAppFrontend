import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect,} from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
    return (
        <Router>
            <Switch>

                <Route
                    path="/auth/login"
                    component={ LoginScreen }
                />

                {/* Main Route */}
                <Route
                    path="/auth/register"
                    component={ RegisterScreen }
                />

                <Redirect to="/auth/login" />

            </Switch>
        </Router>
    )
}
