import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from '../ui/Card';

export default function Home() {
    const [products, setProducts] = useState([]);
    const apiHost = import.meta.env.VITE_APP_HOST;
    const apiUrl = apiHost + '/api/products/all';

    //fetch product data
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(apiUrl);

            if (response.ok) {
                const data = await response.json();
                if (!ignore) {
                    setProducts(data);
                }
            } else {
                setProducts(null);
            }
        }

        let ignore = false;
        fetchData();
        return () => {
            ignore = true;
        }
    }, []); // run only once

    return (
        <>
            <h1>Product List</h1>
            {
                products.length > 0 ?
                    products.map(product => (
                        <Card product={product} apiHost={apiHost} />
                    )) :
                    <p>No products.</p>
            }
        </>
    )
}