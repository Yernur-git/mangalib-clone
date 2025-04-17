import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './store/store';
import Navbar from './components/Navbar';
import AppRoutes from './routes';
import { loadUserFromStorage } from './features/auth/authSlice';

const AppWrapper = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUserFromStorage());
    }, [dispatch]);

    return (
        <>
            <Navbar />
            <AppRoutes />
        </>
    );
};

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <AppWrapper />
            </Router>
        </Provider>
    );
};

export default App;