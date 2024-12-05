import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function Logout() {
    const [status, setStatus] = useState("Logging out...");

    useEffect(() => {
        async function logout() {
            const url = "http://localhost:3000/api/customers/logout";
            const response = await fetch(url, {
                method: "POST",
                credentials: 'include' //include cookies in request
            });

            if (response.ok) {
                setStatus("Successfully logged out");
            } else {
                setStatus("Error encountered. Try again")
            }
        }

        logout();
    }, []);
    return (
        <>
            <h1>Logout</h1>
            <p>{status}</p>
            <Link to="/login" className="btn btn-outline-secondary ms-3">Login</Link>
            <Link to="/" className="btn btn-outline-secondary ms-3">Return to homepage</Link>
        </>
    )
}