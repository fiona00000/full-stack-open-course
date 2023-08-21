import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios'
import './index.css'

axios.get('/api/persons')
  .then(response => {
    const persons = response.data
    ReactDOM.createRoot(document.getElementById('root'))
    .render(<App persons={persons}/>)
})