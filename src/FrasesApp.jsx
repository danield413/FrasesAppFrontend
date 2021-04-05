import React from 'react';
import { AppRouter } from './routers/AppRouter';
import 'normalize.css';
import './scss/styles.scss';
import 'animate.css';
import { Provider } from 'react-redux';
import { store } from './store/store';

export const FrasesApp = () => {
    return (
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    )
}
