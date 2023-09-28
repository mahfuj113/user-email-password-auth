import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Register = () => {
    const [registerError, setRegisterError] = useState('')
    const [successUser, setSuccessUser] = useState('')
    const [seePassword, setSeePassword] = useState(false)
    const handleRegister = e => {
        e.preventDefault();
        setRegisterError('')
        setSuccessUser('')

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;

        if (password.length < 6) {
            setRegisterError("Password should be at least 6 characters or longer")
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError("Your password should have at least one uppercase characters")
            return;
        }
        else if(!accepted){
            setRegisterError("Please accept our terms and condition")
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccessUser("User Successfully created")
                //update profiel
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg",
                })
                .then(() => console.log("Profile updated"))
                .catch()

                //send email verification
                sendEmailVerification(result.user)
                .then(() => {
                    alert("Please check your email and verify your account")
                })
            })
            .catch(error => {
                console.error(error)
                setRegisterError(error.message)
            })
    }
    return (
        <div className="mx-auto md:w-1/2">
            <h2 className="text-3xl mb-8">Please Register</h2>
            <form onSubmit={handleRegister}>
                <input className="mb-4 w-full py-2 px-4" placeholder="Your name" type="text" name="name" id="1" required />
                <br />
                <input className="mb-4 w-full py-2 px-4" placeholder="Your Email" type="email" name="email" id="2" required />
                <br />
                <div className="mb-4 relative border">
                    <input className="w-full py-2 px-4" placeholder="Password"
                        type={seePassword ? "text" : "password"} name="password" id="3" required /> <span className="absolute top-3 right-2" onClick={() => setSeePassword(!seePassword)}>{
                            seePassword ?  <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                        }</span>
                </div>
                <br />
                <div>
                    <input type="checkbox" name="terms" id="terms" />
                    <label htmlFor="terms">Accept our <a href="" className="underline">Terms and Conditions</a></label>
                </div>
                <br />
                <input className="'btn btn-secondary mt-4 w-full" type="submit" value="Register" />
            </form>
            {
                registerError && <p className="text-red-700">{registerError}</p>
            }
            {
                successUser && <p className="text-green-600">{successUser}</p>
            }
            <p>Already hava an account? Please <Link to="/login" className="underline">Login</Link></p>
        </div>
    );
};

export default Register;