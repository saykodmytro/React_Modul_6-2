import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from 'components/App';
import { ModalContextProvider } from 'context/ModalContext';

import './index.css';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ModalContextProvider>
    <BrowserRouter basename="/React_Modul_6-2">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ModalContextProvider>
);
