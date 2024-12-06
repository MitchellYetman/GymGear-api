import { Link } from "react-router-dom";

export default function Confirmation() {
    return (
        <>
            <div>
                <p>Purchase completed successfully</p>
                <Link to="/" className="btn btn-outline-secondary ms-3">Continue shopping</Link>
            </div>
        </>
    )
}