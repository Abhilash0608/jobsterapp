import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown, FaAlignRight } from 'react-icons/fa';
import Logo from './Logo';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, toggleSidebar } from '../reducers/userSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const {user}=useSelector((state)=>state.user)
  const [showLogout,setShowLogout]=useState(false)

  const dispatch=useDispatch()
  const toggle=()=>{
    dispatch(logoutUser("Logging Out..."))
    setShowLogout(false)

  }
  return (
    <Wrapper>
      <div className='nav-center'>
          <button type="button" className='toggle-btn' onClick={()=>dispatch(toggleSidebar())}>
            <FaAlignLeft/>
          </button>
          <div >
            <Logo/>
            <h3 className='logo-text'>dashboard</h3>
          </div>
          <div className='btn-container'>
            <button type="button" className='btn' onClick={()=>setShowLogout(!showLogout)}>
              <FaUserCircle/>{user && user.name}<FaCaretDown />
            </button>
            <div className={showLogout ?'dropdown show-dropdown':'dropdown'}>
              <button className='dropdown-btn' type="button" onClick={toggle}>
                  Logout
              </button>
            </div>
          </div>
      </div>
    </Wrapper>
    
  )
}

export default Navbar