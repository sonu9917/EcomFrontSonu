import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Breadcrumbs from './Breadcrumbs'
import ScrollToTopButton from './ScrollToTopButton'

const Main = () => {
  return (
    <div className=''>
      <Navbar />
      <Breadcrumbs />
      <Outlet />
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}

export default Main