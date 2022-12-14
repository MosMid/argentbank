import { Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from '../../features/userSlice';
import { signInUser } from '../../features/authSlice';

function Signin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const  auth  = useSelector((state) => state.auth)
    const checkbox = useRef()
    const dispatch = useDispatch();

    /**
     * Submit sign in form
     * @param {event} e
     * @listens event
     */
    async function signinForm(e){
        e.preventDefault()
        //check if "remember me" checkbox is checked
        if(checkbox.current.checked){
            dispatch({
                type: "auth/remember",
                payload: true
            })
        }else{
            dispatch({
                type: "auth/remember",
                payload: false
            })
        }
        dispatch(signInUser({email: email, password: password}))
    }
    
    //Wait for token before dispatching user fetch query
    useEffect(()=>{
        if(localStorage.getItem('status') === '200') dispatch(userProfile());
    },[localStorage.getItem('token')])

    return <div>
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={(e) => signinForm(e)}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" ref={checkbox}/><label htmlFor="remember-me">Remember me</label>
                    </div>
                    {auth.status === 400 && <p>Incorrect email or password</p>}
                    {auth.status === 404 && <p>Server error</p>}
                    {auth.loading && <p>Loading ...</p>}
                    {!auth.loading && <button type="submit" className="sign-in-button">Sign In</button>}
                    {auth.status === 200 && (<Navigate to="/profile" replace={true} />)}
                </form>
            </section>
        </main>
    </div>
}

export default Signin