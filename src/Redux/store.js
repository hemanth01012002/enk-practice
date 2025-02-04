import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Using localStorage
import authReducer from './authReducer';
import formReducer from './formReducer'; // Import the new form reducer

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'form'], // Persist both auth and form states
};

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer, // Add the form reducer here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
