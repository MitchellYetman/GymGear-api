import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Details() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const apiHost = import.meta.env.VITE_APP_HOST;
    const getUrl = apiHost + '/api/products/' + id;


    //fetch the product data
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(getUrl);
            if (response.ok) {
                const data = await response.json();
                setProduct(data);
            } else {
                setProduct(null);
            }
        }

        fetchData();
    }, [getUrl]);

    if (!product) {
        return <p>Loading product details...</p>;
    }


    return (
        <>
            <div>
                <h1>Product details for {product.name}</h1>
                <img src={`${apiHost}/images/${product.image_filename}`} className="thumbnail-large" /><br />
                <b>Cost: $</b>{product.cost}<br />
                <b>Description: </b>{product.description}<br />
                <Link to="/" className="btn btn-outline-secondary ms-3">Go back</Link>
                <button className="btn btn-outline-secondary ms-3">Add to cart</button>
            </div>
        </>
    )
}