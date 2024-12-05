import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <>
            <Link to="/">Home</Link> <br />
            <Link to="/Login">Login</Link><br />
            <Link to="/Logout">Logout</Link><br />
            <Link to="/cart">Cart</Link><br />
            <Link to="/signup">Signup</Link><br />

        </>
    )
}