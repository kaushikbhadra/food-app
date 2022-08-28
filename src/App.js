import React, { Fragment } from 'react'

import './App.css'
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
function App() {
  return (
    <Fragment>
      <Header />
      <Meals />
    </Fragment>
  )
}

export default App
