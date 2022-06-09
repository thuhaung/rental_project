import React, { useEffect, useState } from 'react'
import "./SelectPrice.css";

function SelectPrice({ onClickRent, onClickDeposit, onClickElectricity, onClickWater, rentVar, depositVar, electricityVar, waterVar }) {
    const [deposit, setDeposit] = useState(depositVar);
    const [rent, setRent] = useState(rentVar);
    const [electricity, setElectricity] = useState(electricityVar);
    const [water, setWater] = useState(waterVar);

    const incrementRent = () => {
        if (rent < 50000000) {
            setRent(prev => prev + 100000);
        }
    }

    const decrementRent = () => {
        if (rent > 1000000) {
            setRent(prev => prev - 100000);
        }
    }

    const incrementDeposit = () => {
        if (deposit < 10000000) {
            setDeposit(prev => prev + 100000);
        }
    }

    const decrementDeposit = () => {
        if (deposit > 500000) {
            setDeposit(prev => prev - 100000);
        }
    }

    const incrementWater = () => {
        if (water < 100000) {
            setWater(prev => prev + 1000);
        }
    }

    const decrementWater = () => {
        if (water > 10000) {
            setWater(prev => prev - 1000);
        }
    }

    const incrementElectricity = () => {
        if (electricity < 100000) {
            setElectricity(prev => prev + 1000);
        }
    }

    const decrementElectricity = () => {
        if (electricity > 10000) {
            setElectricity(prev => prev - 1000);
        }
    }

    useEffect(() => {

        onClickRent(rent);
        onClickDeposit(deposit);
        onClickWater(water);
        onClickElectricity(electricity);

    }, [rent, deposit, water, electricity]);

    return (
        <div className="select-price-wrapper">
            <div className="select-price-form">
                <h2>Rent</h2>
                <div className="select-price-count">
                    <p onClick={decrementRent}>-</p>
                    <div className="select-price-box">
                        <input type="text" value={rent} onChange={(e) => setRent(parseInt(e.target.value))}/>
                    </div>
                    <p onClick={incrementRent}>+</p>
                </div>
            </div>
            <div className="select-price-form">
                <h2>Deposit</h2>
                <div className="select-price-count">
                    <p onClick={decrementDeposit}>-</p>
                    <div className="select-price-box">
                        <input type="text" value={deposit} onChange={(e) => setDeposit(parseInt(e.target.value))}/>
                    </div>
                    <p onClick={incrementDeposit}>+</p>
                </div>
            </div>
            <div className="select-price-form">
                <h2>Water</h2>
                <div className="select-price-count">
                    <p onClick={decrementWater}>-</p>
                    <div className="select-price-box">
                        <input type="text" value={water} onChange={(e) => setWater(parseInt(e.target.value))}/>
                    </div>
                    <p onClick={incrementWater}>+</p>
                </div>
            </div>
            <div className="select-price-form">
                <h2>Electricity</h2>
                <div className="select-price-count">
                    <p onClick={decrementElectricity}>-</p>
                    <div className="select-price-box">
                        <input type="text" value={electricity} onChange={(e) => setElectricity(parseInt(e.target.value))}/>
                    </div>
                    <p onClick={incrementElectricity}>+</p>
                </div>
            </div>
        </div>
    )
}

export default SelectPrice
