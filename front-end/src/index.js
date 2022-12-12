import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';
import Signin from './components/signin/Signin';
import Profile from './components/profile/Profile';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <PersistGate persistor={persistor}>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
        <Footer/>
      </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

//sudo service mongod start
//npm run dev:server