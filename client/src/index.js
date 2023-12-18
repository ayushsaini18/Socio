import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { authSlice } from 'state';
import { configureStore  } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { persistReducer, 
  persistStore,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
  REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';


// const store=configureStore({
//   reducer:{    //this is the root reducer
//     auth:authSlice.reducer,
//   }
// });

// Configuration for Redux Persist
const persistConfig={
  key:"root",
  storage
}

// Create the persisted reducer
const persistedReducer=persistReducer(persistConfig,authSlice.reducer); //give the root reducer here

// Create the store
// Create the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REGISTER, REHYDRATE, PAUSE, PERSIST, PURGE],
      },
    }),
});



// Create the persisted store
const persistor=persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
  </React.StrictMode>
);
 
// Redux Persist is a library in the Redux ecosystem that allows for  persisting and rehydrating the Redux store. It provides a way to
//  save the state of the Redux store to a persistent storage, such as  the browser's localStorage or AsyncStorage in React Native,
//  and then restore that state when the application is reloaded or reopened.