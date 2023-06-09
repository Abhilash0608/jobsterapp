import Wrapper from '../assets/wrappers/SmallSidebar';
import { FaTimes } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../reducers/userSlice';
import links from '../utils/links';
import NavLinks from './NavLInks';
const SmallSidebar = () => {
  const {isSidebarOpen}=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  return (
    <Wrapper>
      <div className={isSidebarOpen ?'sidebar-container show-sidebar':'sidebar-container'}>
        <div className='content'>
        <button className="btn close-btn" onClick={()=>dispatch(toggleSidebar())}>
          <FaTimes/>
        </button>
        <header>
          <Logo/>
        </header>

          <NavLinks toggleSidebar={toggleSidebar}/>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar