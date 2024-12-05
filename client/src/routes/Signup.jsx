import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const apiHost = import.meta.env.VITE_APP_HOST;
    const apiUrl = apiHost + '/api/customers/signup';

    function createUser(data) {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);

        async function postSignupData() {
            // const response = await fetch(apiUrl, {
            //     method: 'POST',
            //     body: formData,
            // });

            //help from ChatGPT. would not take the above code for some reason even though I have basically the exact same request in my assignment 2 code (which works fine)
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set content type explicitly for JSON
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    firstName: data.firstName,
                    lastName: data.lastName,
                }),
            });

            if (response.ok) {
                window.location.href = '/login';
            } else {
                alert("Signup failed. Please try again.")
            }
        }

        postSignupData();
    }//end createUser


    return (
        <>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit(createUser)} method="post" encType="application/x-www-form-urlencoded">
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
                <div className="mb-3">
                    <label className="form-label">First name:</label>
                    <input {...register("firstName", { required: true })} type="text" className="form-control bg-light" style={{ width: '300px' }} />
                    {errors.firstName && <span className="text-danger">First name is required.</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Last name:</label>
                    <input {...register("lastName", { required: true })} type="text" className="form-control bg-light" style={{ width: '300px' }} />
                    {errors.lastName && <span className="text-danger">Last name is required.</span>}
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
                <Link to="/" className="btn btn-outline-secondary ms-3">Return to homepage</Link>
            </form>
        </>
    )
}