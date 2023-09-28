import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import auth from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const Login = () => {
    const [registerError, setRegisterError] = useState('')
    const [successUser, setSuccessUser] = useState('')
    const emailRef = useRef(null)
    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        // reset error and success
        setRegisterError('');
        setSuccessUser('');


        // add validation 
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                if (result.user.emailVerified) {
                    setSuccessUser('User Logged in Successfully.')
                }
                else {
                    alert('Please verify your email address.')
                }
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message);
            })
    }
    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if(!email){
            console.log("Please provide an email",email.current.value);
            return;
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            console.log("Please write a valid email");
            return;
        }
        sendPasswordResetEmail(auth,email)
        .then(() => {
            alert("Please check your email")
        })
        .catch(error => {
            console.error(error.message);
        })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    ref={emailRef}
                                    placeholder="email"
                                    className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        {
                            registerError && <p className="text-red-700">{registerError}</p>
                        }
                        {
                            successUser && <p className="text-green-600">{successUser}</p>
                        }
                        <p>New to this website? Please <Link to="/register" className="underline">Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;