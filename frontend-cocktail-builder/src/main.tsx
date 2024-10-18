import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {GOOGLE_CLIENT_ID} from './constants';
import {addInterceptors} from './axiosApi';
import {persistor, store} from './app/store';
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

addInterceptors(store);


createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <App/>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </StrictMode>
  </GoogleOAuthProvider>,
);
