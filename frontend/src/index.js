import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

//Redux
import { Provider } from 'react-redux';//vai rover os dados da story Manege
import {store} from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Provider aqui vai basicamente ser responsavel por enviar os dados para os nossos componentes */}
    <Provider store={store}>
    <App />
    </Provider>
     
  </React.StrictMode>
);


