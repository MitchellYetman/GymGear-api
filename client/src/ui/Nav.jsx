import { useNavigate } from "react-router-dom";

export default function Nav(props) {
    let navigate = useNavigate();
    return (
        <>
            <div className="d-flex align-items-center position-relative" style={{ color: "white", justifyContent: "end", fontSize: "20px" }}>
                <div onClick={() => { navigate("/") }}>
                    <b>Home</b>
                </div>

                {/*display logout if logged in */}
                {props.isLoggedIn &&
                    <div className="d-flex align-items-center position-relative">
                        <div style={{ fontSize: "24px", paddingRight: "5px", paddingLeft: "5px" }}>|</div>
                        <div onClick={() => { navigate("/logout") }}>
                            <b>Logout</b>
                        </div>
                    </div>
                }

                {/*display login and signup if logged out */}
                {!props.isLoggedIn &&
                    <div className="d-flex align-items-center position-relative">
                        <div style={{ fontSize: "24px", paddingRight: "5px", paddingLeft: "5px" }}>|</div>
                        <div onClick={() => { navigate("/login") }}>
                            <b>Login</b>
                        </div>
                        <div style={{ fontSize: "24px", paddingRight: "5px", paddingLeft: "5px" }}>|</div>
                        <div onClick={() => { navigate("/signup") }}>
                            <b>Signup</b>
                        </div>
                    </div>
                }

                <div onClick={() => { navigate("cart") }} >
                    <div className="d-flex align-items-center position-relative">
                        <div style={{ fontSize: "24px", paddingRight: "5px", paddingLeft: "5px" }}>|</div>
                        <i className="bi bi-cart"></i>
                    </div>
                </div>
            </div >


        </>
    )
}