import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../features/updateSlice"
import { Navigate } from 'react-router-dom'

function Profile(){
    const token = localStorage.getItem('token')
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [edit, setEdit] = useState(false)
    const user = useSelector(state => state.user)
    const auth = useSelector(state => state.auth)
    const update = useSelector(state => state.update)
    const dispatch = useDispatch()
    const remember = useRef()
    remember.current = auth.remember
    const updatedFirstName = useRef()
    updatedFirstName.current = update.firstName
    const updatedLastName = useRef()
    updatedLastName.current = update.lastName
    
    //Deauthenticate when session expires
    setTimeout(() => {
        if(remember.current === false){
            dispatch({
                type: "auth/logout",
            })
            window.location.reload()
        }
    }, 10000);
    
    /**
     * Trigger display of edit user profile element
     */
    function handleEdit(){
        setEdit(true)
    }
    /**
     * Hides edit user profile element
     */
    function cancelForm(){
        setEdit(false)
    }
    
    /**
     * Submit update user profile form
     * @param {event} e
     * @listens event
     */
    function updateForm(e){
        e.preventDefault()
        dispatch(updateUser({firstName: firstName, lastName: lastName}))
        setEdit(false)
        setTimeout(function(){
            dispatch({
                type: "user/update",
                payload: {firstName: updatedFirstName.current, lastName: updatedLastName.current}
            })
            localStorage.setItem('token', token)
        }, 100)
    }

    return <div>
        {localStorage.getItem('token') &&
        <main className="main bg-dark profile">
            {!edit && <div className="header">
                <h1>Welcome back<br /><span id="name">{user.firstName} {user.lastName}</span></h1>
                <button className="edit-button" onClick={() => handleEdit()}>Edit Name</button>
            </div>}
            {edit && <div className="updateForm">
                <form onSubmit={(e) => updateForm(e)}>
                    <h1>Welcome back</h1>
                    <div className="inputFields">
                        <div className="input-wrapper">
                            <input type="text" id="firstName" placeholder={user.firstName} value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                        </div>
                        <div className="input-wrapper">
                            <input type="lastName" id="lastName" placeholder={user.lastName} value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="editButtons">
                        <button type="submit" className="sign-in-button">Save</button>
                        <button className="sign-in-button" onClick={() => cancelForm()}>Cancel</button>
                    </div>
                </form>
            </div>}
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                <p className="account-amount">$2,082.79</p>
                <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                <p className="account-amount">$10,928.42</p>
                <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                <p className="account-amount">$184.30</p>
                <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </main>}
        {!localStorage.getItem('token') && <Navigate to="/signin" replace={true}/>}
    </div>
}

export default Profile