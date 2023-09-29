import { useEffect, useState } from "react"
import Navigation from "../Navigation/Navigation"

import Style from "./Cart.module.css"

function Cart() {
    const [cart, setCart] = useState([])
    const [totalCost, setTotalCost] = useState(0);
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || []
        setCart(cart)
        const cost = cart.reduce((total, item) => total + item.price, 0);
        setTotalCost(cost);
        console.log(cart);
    }, [])

    function removeFromCart(index){
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);

        const cost = updatedCart.reduce((total, item) => total + item.price, 0);
        setTotalCost(cost);

        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    function handleBuy(){
        if(totalCost>0){
            alert("Thanks for buying this product. It will be delivered to you within the next 3 days.");
        }
        else{
            alert("Please Add Items in Your Cart");
        }
    }

    return (
        <div>
            <div className={Style.navigation}>
                <Navigation />
            </div>
            <div className={Style.product}>
                <div className={Style.left}>
                    {cart.length>0?(
                        cart.map((i, index) => (
                            <div key={index} className={Style.item}>
                                <div className={Style.image}>
                                    <img src={i.image} />
                                </div>
                                <div className={Style.description}>
                                    <h1>{i.title}</h1>
                                    <h3>{i.catagory}</h3>
                                    <h4>{i.description}</h4>
                                </div>
                                <div className={Style.price}>
                                    <h3>₹ {i.price}</h3>
                                    <button onClick={()=>removeFromCart(index)}>❌</button>
                                </div>
                            </div>
                        ))
                    ):(<h1 className={Style.noItem}>No Items To Show</h1>)}
                </div>
                <div className={Style.right}>
                    <div className={Style.rightFixed}>
                        <h1>Thanks For Shopping With Us !!!</h1>
                        <h2>Your Total Cost IS :-</h2>
                        <h2>₹ {totalCost}</h2>
                        <button onClick={handleBuy}>Buy Now</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Cart