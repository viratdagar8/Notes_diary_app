import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-60'>
        <NavLink to="/">
            Home
        </NavLink>
        
        <NavLink to="/pastes">
            All Notes
        </NavLink>
    </div>
  )
}

export default Navbar