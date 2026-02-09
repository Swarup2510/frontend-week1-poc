import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/index'
import App from './App.jsx'

// Start the app
const root = createRoot(document.getElementById('root'))

// Enable MSW before rendering
if (import.meta.env.DEV) {
  import('./mocks/browser.js').then(({ worker }) => {
    worker.start({
      onUnhandledRequest: 'bypass',
    }).then(() => {
      root.render(
        <StrictMode>
          <Provider store={store}>
            <App />
          </Provider>
        </StrictMode>
      )
    }).catch((error) => {
      console.error('Failed to start MSW:', error)
      // Render anyway even if MSW fails
      root.render(
        <StrictMode>
          <Provider store={store}>
            <App />
          </Provider>
        </StrictMode>
      )
    })
  }).catch((error) => {
    console.error('Failed to import MSW:', error)
    // Render anyway even if MSW import fails
    root.render(
      <StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </StrictMode>
    )
  })
} else {
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  )
}
