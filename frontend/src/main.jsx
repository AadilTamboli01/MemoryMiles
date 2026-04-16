import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import "react-day-picker/style.css";
import App from './App.jsx'
import { persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Provider store={store}>

      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>

    </Provider>,
  </BrowserRouter>




)
