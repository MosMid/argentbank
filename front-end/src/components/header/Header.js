import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import logo from './argentBankLogo.png'

function Header(){
    const user = useSelector(state => state.user.firstName)
    const isAuth = useSelector(state => state.auth.isAuth)
    const dispatch = useDispatch()

    /**
     * Logout user
     */
    function handleLinkClick(){
        dispatch({
            type: "auth/logout",
        })
        this.location.reload();
    };
    return <div>
        <nav className="main-nav">
            <Link to='/' className="main-nav-logo">
                <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo"/>
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {!isAuth &&
                <Link to='/signin' className="main-nav-item">
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </Link>}
                {isAuth &&
                (<div className='loggedInHeader'>
                    <Link to='/profile' className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        {user}
                    </Link>
                    <Link to='/' className="main-nav-item" onClick={()=>handleLinkClick()}>
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                        Sign Out
                    </Link>
                </div>)}
            </div>
        </nav>
    </div>
}

export default Header