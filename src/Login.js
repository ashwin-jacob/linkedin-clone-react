import './Login.css'
import {auth} from "./firebase";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "./features/userSlice";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const dispatch = useDispatch();

    const register = () => {
        if (!name) {
            return alert('Please enter full name');
        }
        auth.createUserWithEmailAndPassword(email,password).then((userAuth) => {
            userAuth.user.updateProfile({
                displayName: name,
                photoURL: profilePic
            }).then(() => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: userAuth.user.displayName,
                    photoUrl: userAuth.user.photoURL,
                }))
            })
        }).catch((error) => {
            alert(error);
        })
    }

    const loginToApp = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password).then((userAuth) => {
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                photoUrl: userAuth.user.photoURL
            }))
        }).catch((error) => {
            alert(error);
        })
    }


    return (
        <div className='login'>
            <img src='https://cdn.pixabay.com/photo/2021/09/02/16/48/cat-6593947_960_720.jpg' alt='' />
            <form>
                <input placeholder='Full name (required if registering)' type='text' value={name} onChange={e => setName(e.target.value)} />
                <input placeholder='Profile Pic Url (Optional)' type='text'  value={profilePic} onChange={e => setProfilePic(e.target.value)}/>
                <input placeholder='Email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
                <input placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
                <button type='submit' onClick={loginToApp}>Sign in</button>
            </form>
            <p>Not a member?{'  '}
                <span className='login__register' onClick={register}>Register Now</span>
            </p>
        </div>
    )
}

export default Login;