export default function Card(props) {
    return (
        <div className="card mt-2 mb-2" style={{ maxWidth: '500px' }}>
            <div className="card-body">
                <div className="d-flex align-items-center position-relative" >
                    <img src={`${props.apiHost}/images/${props.product.image_filename}`} className="thumbnail" onClick={() => {
                        window.location.href = "/details/" + props.product.product_id
                    }} />

                    <div className="product-info">
                        <h5 className="card-title">{props.product.name}</h5>
                        <p className="card-text">
                            <b>Cost: </b>${props.product.cost}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}