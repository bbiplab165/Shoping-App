import axios from "axios"
import { useEffect, useState } from "react"

import Style from "./Filter.module.css"


function Filter({ onFilterChange }) {
    const [catagory, setCatagories] = useState([])
    const [prices, setPrice] = useState([])
    const [selectedPrice, setSelectedPrice] = useState("all");
    const [selectedCata, setSelectedCata] = useState("all");

    async function fetchfilters() {
        const data = await axios.get("http://localhost:3000/filterCatagory")
        setCatagories(data.data.data)
    }
    useEffect(() => {
        fetchfilters()
    }, [])

    const handleRadioChange = (event) => {
        setSelectedCata(event.target.value);
        sendFilterData(event.target.value, selectedPrice);
    };
    const handlePriceChange = (event) => {
        setSelectedPrice(event.target.value);
        sendFilterData(selectedCata, event.target.value);
    };

    const sendFilterData = (selectedCata, selectedPrice) => {
        const filterData = {
            selectedPrice: selectedPrice,
            selectedCata: selectedCata,
        };
        onFilterChange(filterData);
    };

    return (
        <div className={Style.main}>
            <h2>Catagory</h2>
            <div>
                <input
                    type="radio"
                    name="Catagory"
                    value="all"
                    checked={selectedCata === "all"}
                    onChange={handleRadioChange}
                />
                <label htmlFor="all">All</label>

                {catagory.map((i, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            name="Catagory"
                            value={i}
                            checked={selectedCata === i}
                            onChange={handleRadioChange}
                        />
                        <label htmlFor={i}>{i}</label>
                    </div>
                ))}

            </div>
            <h2>Price</h2>
            <div className={Style.price}>
                <div>
                    <input
                        type="radio"
                        name="price"
                        value="all"
                        checked={selectedPrice === "all"}
                        onChange={handlePriceChange}
                    />
                    <label htmlFor="all">All</label>
                </div>

                <div>
                    <input
                        type="radio"
                        name="price"
                        value="0"
                        checked={selectedPrice === "0"}
                        onChange={handlePriceChange}
                    />
                    <label htmlFor="0">₹ 0 - ₹ 1000</label>
                </div>

                <div>
                    <input
                        type="radio"
                        name="price"
                        value="1000"
                        checked={selectedPrice === "1000"}
                        onChange={handlePriceChange}
                    />
                    <label htmlFor="1000">₹ 1000 - ₹ 5000</label>
                </div>

                <div>
                    <input
                        type="radio"
                        name="price"
                        value="5000"
                        checked={selectedPrice === "5000"}
                        onChange={handlePriceChange}
                    />
                    <label htmlFor="5000">Over ₹ 5000</label>
                </div>
            </div>

        </div>
    )
}

export default Filter