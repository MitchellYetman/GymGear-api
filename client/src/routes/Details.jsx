import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Details() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const apiHost = import.meta.env.VITE_APP_HOST;
    const getUrl = apiHost + '/api/products/' + id;
    const [cookies, setCookie] = useCookies(["productIDs"]);


    //fetch the product data
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(getUrl, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setProduct(data);
            } else {
                setProduct(null);
            }
        }

        fetchData();
    }, [getUrl]);

    //make sure product is populated before proceeding
    if (!product) {
        return <p>Loading product details...</p>;
    }

    //function to add the product id to the cookie or create one with the product id if one does not exist
    function addProduct(id) {
        if (cookies.productIDs) {
            setCookie('productIDs', cookies.productIDs + ',' + id.toString(), { path: '/' }) //path part from ChatGPT
        } else {
            setCookie('productIDs', id.toString(), { path: '/' }) //path part from ChatGPT
        }
    }

    return (
        <>
            <div>
                <h1>Product details for {product.name}</h1>
                <img src={`${apiHost}/images/${product.image_filename}`} className="thumbnail-large" /><br />
                <b>Cost: $</b>{product.cost}<br />
                <b>Description: </b>{product.description}<br />
                <Link to="/" className="btn btn-outline-secondary ms-3">Go back</Link>
                <button className="btn btn-outline-secondary ms-3" onClick={() => addProduct(id)}>Add to cart</button><br />
            </div>
        </>
    )
}