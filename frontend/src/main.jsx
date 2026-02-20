// frontend/src/main.jsx
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { applyTheme, getTheme } from "./theme/theme.js"

applyTheme(getTheme())

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="app-bg">
      <App />
    </div>
  </React.StrictMode>
)