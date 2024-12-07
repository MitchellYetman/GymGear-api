import { Link } from "react-router-dom";

export default function Confirmation() {
    return (
        <>
            <div>
                <p style={{ color: "white" }}>Purchase completed successfully</p>
                <Link to="/" className="btn btn-outline-secondary ms-3" style={{ color: "black", backgroundColor: "white" }}>Continue shopping</Link>
            </div>
        </>
    )
}