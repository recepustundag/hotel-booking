import React from 'react'
import Header from './components/Header'
import Step from './components/Step'

const Home = () => {
  return (
    <div id="room-booking" className="container px-2 pb-12 mx-auto border border-t-0 border-gray-200 md:px-0 max-w-screen-2xl">
    <Header />
    <Step />
    </div>
  )
}

export default Home
