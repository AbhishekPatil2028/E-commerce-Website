// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import {Provider} from 'react-redux'
// import store from './redux/store'
// import { Toaster } from './components/ui/sonner.js'
// import { PersistGate } from 'redux-persist/integration/react'
// import {persistStore} from 'redux-persist'

// let persistor = persistStore(store)

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//     <App />
//     <Toaster />
//     </PersistGate>
//     </Provider>
//   </StrictMode>,
// )



import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import App from './App.jsx'
import './index.css'
import { Toaster } from './components/ui/sonner.js'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
)