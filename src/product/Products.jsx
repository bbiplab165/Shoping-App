import { useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation"
import { useEffect, useState } from "react";
import axios from "axios";

import Style from "./Products.module.css"

function Product() {
    const location = useLocation();
    const [product, setProduct] = useState('')
    const [size, setSize] = useState('')
    const [clickedSize, setClickedSize] = useState(null);

    const id = new URLSearchParams(location.search).get("id");

    async function fetchProduct() {
        const product = await axios.get(`http://localhost:3000/product/${id}`)
        console.log(product.data.data);
        setSize(product.data.data.size)
        setProduct(product.data.data)
    }
    useEffect(() => {
        fetchProduct()
    }, [])

    const handleH4Click = (key) => {
        setClickedSize(key);
    };

    function handleCart(i){
        if (clickedSize === null) {
            alert("Please Select Size");
        } else {
            alert("Item added to cart");
            const cart=JSON.parse(localStorage.getItem('cart'))||[]
            cart.push(i)
            localStorage.setItem('cart',JSON.stringify(cart))
        }
    }
    
    function handleBuy(){
        if (clickedSize === null) {
            alert("Please Select Size");
        } else {
            console.log(clickedSize);
            alert("Thanks for buying this product. It will be delivered to you within the next 3 days.");
        }
    }
    return (
        <div className={Style.main}>
            <div className={Style.nav}>
                <Navigation />
            </div>
            <div className={Style.body}>
                <div className={Style.image}>
                    <img src={product.image} />
                </div>
                <div className={Style.desc}>
                    <h1>{product.title}</h1>
                    <h3>{product.catagory}</h3>
                    <hr/>
                    <h3>₹ {product.price}</h3>
                    <div className={Style.size}>
                        {Object.entries(size).map(([key]) => (
                            <div key={key} className={Style.eachSize}>
                                <h4
                                    className={clickedSize === key ? Style.clicked : ''}
                                    onClick={() => handleH4Click(key)}
                                >
                                    {key}
                                </h4>
                            </div>
                        ))}
                    </div>
                    <h4>{product.description}</h4>

                    <div className={Style.buyButton}>
                        <button onClick={()=>handleCart(product)}>Add to Cart</button>
                        <button onClick={handleBuy}>Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product