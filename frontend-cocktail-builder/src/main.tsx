import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {GoogleOAuthProvider} from '@react-oauth/google';
import {GOOGLE_CLIENT_ID} from './constants';

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <StrictMode>
      <App/>
    </StrictMode>
  </GoogleOAuthProvider>,
);
