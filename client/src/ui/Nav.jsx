import { Link } from "react-router-dom";

export default function Nav(props) {
    return (
        <>
            <Link to="/">Home</Link>
            {props.isLoggedIn && <Link to="/logout">Logout</Link>}
            {!props.isLoggedIn && <Link to="/login">Login</Link>}
            <Link to="/cart"><i className="bi bi-cart"></i></Link>
            <Link to="/signup">Signup</Link>

        </>
    )
}