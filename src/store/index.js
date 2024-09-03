import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import authSlice from './slice/authSlice'; // auth slice reducer

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	whitelist: ['auth'], // Persist only the 'auth' slice
};

const rootReducer = combineReducers({
  auth: authSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false })

});

export const persistor = persistStore(store);
export default store;