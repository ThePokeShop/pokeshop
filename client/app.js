import React from 'react'

import {Navbar, Footer} from './components'
import Routes from './routes'


const App = () => {
  return (
    <main>
      <Navbar />
      <Routes />
      <Footer />
    </main>
  )
}

export default App
