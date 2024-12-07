import { useState, useEffect } from 'react';
import Card from '../ui/Card';

export default function Home() {
    const [products, setProducts] = useState([]);
    const apiHost = import.meta.env.VITE_APP_HOST;
    const apiUrl = apiHost + '/api/products/all';

    //fetch product data
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(apiUrl, {
                credentials: 'include'
            });

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
    }, []);

    return (
        <>
            <div >
                <br />
                <div style={{ textAlign: "center" }} >
                    <h1 style={{ color: "white" }}>Products</h1>
                </div>
                <div className="card-container" >
                    {
                        products.length > 0 ?
                            products.map(product => (
                                <div><Card product={product} apiHost={apiHost} /></div>
                            )) :
                            <p>No products.</p>
                    }
                </div>

            </div>
        </>
    )
}