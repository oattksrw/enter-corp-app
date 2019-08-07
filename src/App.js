import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
// import * as admin from 'firebase-admin';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
    componentWillMount() {
        console.disableYellowBox = true;
        const config = {
            apiKey: 'AIzaSyC5zaxHw9wV2wgcsSqMNEdGV8Do9k_UmNw',
            authDomain: 'authentication-79ec4.firebaseapp.com',
            databaseURL: 'https://authentication-79ec4.firebaseio.com',
            projectId: 'authentication-79ec4',
            storageBucket: 'authentication-79ec4.appspot.com',
            messagingSenderId: '249389799961'
        };
        firebase.initializeApp(config);
        // admin.initializeApp(config);
    }

    render() {
        YellowBox.ignoreWarnings([
            'Warning: componentWillMount is deprecated',
            'Warning: componentWillReceiveProps is deprecated',
            'Warning: componentWillUpdate is deprecated',
            'Setting a timer'
        ]);

        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
