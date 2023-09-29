
import { useEffect, useState } from 'react';
import Navigation from '../Navigation/Navigation';
import Filter from '../filter/filter'

import axios from 'axios';
import Style from "./home.module.css"
import star from "../assets/icons.png"
import { useNavigate } from 'react-router-dom';
import Product from '../product/Products';

function Home() {
    const [count, setCount] = useState(0)
    const [length, setLength] = useState(0)
    const [product, setProduct] = useState([])
    const [selectedValue, setSelectedValue] = useState('');

    const navigate = useNavigate()

    async function fetchProducts() {
        const products = await axios.get(`http://localhost:3000/allProducts/${count}`)
        setProduct(products.data.data)
        console.log(products.data.length);
        setLength(products.data.length)
    }

    const handleFilterChange = (value) => {
        setSelectedValue(value);
        console.log(value);
    };

    // useEffect(()=>{
    //     fetchProducts()
    // },[])
    async function filterProducts() {
        console.log(selectedValue);
        const price = selectedValue.selectedPrice
        const catagory = selectedValue.selectedCata
        console.log(price, catagory)
        if (!price || !catagory) {
            fetchProducts()
        }
        else {
            const data = await axios.get(`http://localhost:3000/filterProducts/${price}/${catagory}`)
            console.log(data.data.data);
            setProduct(data.data.data)
        }
    }
    useEffect(() => {
        filterProducts()
    }, [selectedValue, count])

    function handleProduct(id) {
        console.log(id);
        navigate(`/Product?id=${id}`)//  Product?id=${id}`
    }

    function handleNext() {
        setCount(count + 15)
    }
    function handleAllItems() {
        setCount(0)
        fetchProducts()
    }
    function handleCart(i){
        alert("Item added to cart");
        const cart=JSON.parse(localStorage.getItem('cart'))||[]
        cart.push(i)
        localStorage.setItem('cart',JSON.stringify(cart))
    }
    return (
        <div className={Style.main}>
            <Navigation />
            <div className={Style.body}>
                <div className={Style.filter}>
                    <Filter onFilterChange={handleFilterChange} />
                </div>
                <div>
                    <div className={Style.products}>
                        {product.map((i) => (
                            <div key={i._id} className={Style.items} onClick={() => { handleProduct(i._id) }}>
                                <img src={i.image} className={Style.img} />
                                <h2>{i.title}</h2>
                                <h3>{i.catagory}</h3>
                                <div className={Style.review}>
                                    <img src={star} className={Style.star} />
                                    <img src={star} className={Style.star} />
                                    <img src={star} className={Style.star} />
                                    <img src={star} className={Style.star} />
                                    <img src={star} className={Style.star} />
                                    <h4>(123)</h4>
                                </div>
                                <div className={Style.detail}>
                                    <h4>₹ {i.price}</h4>
                                    <img onClick={(e)=>{e.stopPropagation(); handleCart(i)}} src="https://st3.depositphotos.com/3047529/33307/i/1600/depositphotos_333073234-stock-photo-shopping-cart-symbol-illustration.jpg" />
                                </div>
                            </div>
                        ))}

                    </div>
                    <div >
                        <div className={Style.next}>
                            {(count + 15) < length ? (selectedValue ? (<h1></h1>) : (<button onClick={handleNext}>Load Next</button>)) : (<button onClick={handleAllItems} className={Style.allItems}>Load All Items</button>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home