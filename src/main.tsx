import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import store from './store/index.ts'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from './routers/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
