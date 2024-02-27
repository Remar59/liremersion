import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';

import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import users from '../src/reducers/users'
import { configureStore, combineReducers } from '@reduxjs/toolkit';

const reducers = combineReducers({ users })
const persistConfig = { key: 'LireMersion_db', storage }
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store)

function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
    </PersistGate>
    </Provider>
  );
}

export default App;
