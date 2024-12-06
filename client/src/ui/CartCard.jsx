import { useNavigate } from "react-router-dom";

export default function CartCard(props) {
    let navigate = useNavigate()

    function removeProduct() {
        if (props.cookie.toString().length === 1) {
            props.setCookie('productIDs', "", { path: '/' })
        }

        const productIDsArray = props.cookie.split(",")
        const productIndex = productIDsArray.indexOf(props.product.product_id.toString());

        if (productIndex !== -1) {
            productIDsArray.splice(productIndex, 1);
            const updatedCookie = productIDsArray.join(',');
            props.setCookie('productIDs', updatedCookie, { path: '/' });
        }
    }

    function removeAllProduct() {
        if (props.cookie.toString().length === 1) {
            return props.setCookie('productIDs', "", { path: '/' })
        }

        const productIDsArray = props.cookie.split(",")
        productIDsArray.sort((a, b) => a - b);

        if (productIDsArray[0] == productIDsArray[productIDsArray.length - 1]) {
            return props.setCookie('productIDs', "", { path: '/' })
        }

        let updatedCookie;
        productIDsArray.forEach((id) => {
            const productIndex = productIDsArray.indexOf(props.product.product_id.toString());
            if (productIndex !== -1) {
                productIDsArray.splice(productIndex, 1);
                updatedCookie = productIDsArray.join(',');
            }
        })
        props.setCookie('productIDs', updatedCookie, { path: '/' })
    }

    return (
        <div className="card mt-2 mb-2" style={{ maxWidth: '500px' }}>
            <div className="card-body">
                <div className="d-flex align-items-center position-relative">
                    <img src={`${props.apiHost}/images/${props.product.image_filename}`} className="thumbnail" onClick={() => {
                        navigate("/details/" + props.product.product_id)
                    }} />
                    <div className="product-info">
                        <h5 className="card-title">{props.product.name}</h5>
                        <p className="card-text">
                            <b>Name: </b>{props.product.name}<br />
                            <b>Cost (each): </b>${props.product.cost}<br />
                            <b>Quantity: </b>{props.quantity}<button onClick={removeProduct} className="btn btn-outline-secondary ms-3">-</button><button className="btn btn-outline-secondary ms-3" onClick={removeAllProduct}>Remove all</button><br />
                            <b>Total: </b>${(props.product.cost * props.quantity).toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}