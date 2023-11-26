import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slice/user.slice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL }),
            })
            const data = await res.json()
            dispatch(loginSuccess(data))
            navigate("/")
        } catch (error) {
            console.log("Could not sign in", error)
        }
    }
    return (
        <button type='button' onClick={signInWithGoogle} className='bg-red-700 uppercase text-white mx-4 -mt-2 mb-3 py-4 text-xl rounded-full hover:opacity-95'>CONTINUE WITH GOOGLE</button>
    )
}

export default OAuth