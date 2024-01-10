import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
// axios.defaults.baseURL = "http://node-sms-app-env.eba-cb46nstu.us-east-2.elasticbeanstalk.com/";
// axios.defaults.baseURL="http://enviroment-1.eba-pndezgkf.eu-west-2.elasticbeanstalk.com/"
axios.defaults.baseURL = "http://localhost:7000/";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer/>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);


