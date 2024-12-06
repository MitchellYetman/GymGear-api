import { useForm } from "react-hook-form";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginFail, setLoginFail] = useState(false);
    const apiHost = import.meta.env.VITE_APP_HOST;
    const apiUrl = apiHost + '/api/customers/login';
    const { setIsLoggedIn } = useOutletContext();
    const navigate = useNavigate();

    function loginUser(data) {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);

        async function tryLogin() {
            const response = await fetch(apiUrl, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                navigate("/")
                setIsLoggedIn(true);

            } else {
                setLoginFail(true);
            }
        }
        tryLogin();
    }//end loginUser


    return (
        <>
            <div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit(loginUser)} method="post" className="w-25">
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input {...register("email", { required: true })} type="text" className="form-control bg-light" style={{ width: '300px' }} />
                        {errors.email && <span className="text-danger">Email.</span>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input {...register("password", { required: true })} type="password" className="form-control bg-light" style={{ width: '300px' }} />
                        {errors.password && <span className="text-danger">Password is required.</span>}
                    </div>
                    {loginFail && <p className="text-danger">Incorrect username or password.</p>}
                    <button type="submit" className="btn btn-primary">Login</button>
                    <Link to="/signup" className="btn btn-outline-secondary ms-3">Signup</Link>
                </form>
            </div>
        </>
    )
}