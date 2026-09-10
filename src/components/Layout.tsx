import { useState } from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  const [showNavbar, setShowNavbar] = useState(true)
  return (
    <div className='min-h-screen w-full bg-[#101218]'>
      {showNavbar && <NavBar />}
      <main className=''>
        <Outlet context={{ setShowNavbar }} />
      </main>
    </div>
  )
}

export default Layout
