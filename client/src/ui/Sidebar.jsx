import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <>
            <Link to="/">Home</Link> <br />
            <Link to="/cart">Cart</Link><br />
            <Link to="/Checkout">Checkout</Link><br />
            <Link to="/Confirmation">Confirmation</Link><br />
            <Link to="/Details">Details</Link><br />
            <Link to="/Login">Login</Link><br />
            <Link to="/Logout">Logout</Link><br />
            <Link to="/Signup">Signup</Link><br />

        </>
    )
}