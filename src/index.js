import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import AuthProvider from './context/AuthProvider'
import ChatProvider from './context/ChatProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router basename={process.env.PUBLIC_URL}>
        <AuthProvider>
            <ChatProvider>
                <App />
            </ChatProvider>
        </AuthProvider>
    </Router>
);
