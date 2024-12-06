import { useEffect, useState } from "react"
import { Link, useOutletContext } from "react-router-dom";
import { useCookies } from 'react-cookie';

export default function Logout() {
    const [status, setStatus] = useState("Logging out...");
    const { setIsLoggedIn } = useOutletContext();
    const [setCookie] = useCookies(["productIDs"]);

    useEffect(() => {
        async function logout() {
            const url = "http://localhost:3000/api/customers/logout";
            const response = await fetch(url, {
                method: "POST",
                credentials: 'include'
            });

            if (response.ok) {
                setStatus("Successfully logged out");
                setIsLoggedIn(false);
                setCookie('productIDs', "", { path: '/' })
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