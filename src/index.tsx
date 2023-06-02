import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ModalState} from "./context/ModalContext";
import {AuthState} from "./context/AuthContext";
import {FetchState} from "./context/FetchContext";
import {CookiesProvider} from "react-cookie";
import {LoginDialogState} from "./context/LoginDialogContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <CookiesProvider>
            <ModalState>
                <AuthState>
                    <FetchState>
                        <LoginDialogState>
                            <App />
                        </LoginDialogState>
                    </FetchState>
                </AuthState>
            </ModalState>
        </CookiesProvider>
    </BrowserRouter>
);

reportWebVitals();
