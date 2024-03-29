import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
          <Auth0Provider
            domain="dev-ajn5u5fr4thrnyzh.us.auth0.com"
            clientId="laDjmv8C5ogisnlbtKIASh7m4zrJ5sjx"
            redirectUri={window.location.origin}
            onRedirectCallback={() => {}}
            useRefreshTokens={true}
            cacheLocation="localstorage" // Use local storage for token cache
          >
        <Routes>
            <Route path="/*" element={ <App/> } />
        </Routes>
    </Auth0Provider>
      </BrowserRouter>
    </ChakraProvider>
  // </React.StrictMode>
);