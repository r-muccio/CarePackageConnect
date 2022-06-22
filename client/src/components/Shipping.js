import React, { useState, useEffect, useContext } from "react";
import styled, {keyframes} from "styled-components";
import { UserContext } from "./UserContext";
import DesktopShippingForm from "./DesktopShippingForm";
import MobileShippingForm from "./MobileShippingForm";

const Shipping = () => {
    const {newMailInfo, setNewMailInfo} = useContext(UserContext);
    const [quotesReceived, setQuotesReceived] = useState(false);
    const [quotes, setQuotes] = useState(false);
    const [quoteFail, setQuoteFail] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [animationGo, setAnimationGo] = useState(false);
    const [isBooped, setIsBooped] = useState(false);
    const mql = window.matchMedia('(min-width: 1100px)');

    function handleChange(ev, key){
        setNewMailInfo({...newMailInfo, [key]: ev.target.value});
    };

    useEffect(()=> {
        const mql = window.matchMedia('(min-width: 1100px)');
        const interval = setInterval(() => {
            if (mql.matches){
                if (!isBooped && animationGo){
                    setIsBooped(true);
                    setAnimationComplete(true);
                }
                if (!isBooped){
                    setIsBooped(true);
                }
            }
            if (!mql.matches){
                setIsBooped(false);
            }
        }, 250);
        return () => clearInterval(interval);
        
    }, []);
    
    async function submitForm(target){
        setQuoteFail(false);
        const mql = window.matchMedia('(min-width: 1100px)');
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(newMailInfo),
        };        
        try {
            const response = await fetch("/getShippingRate", options);
            const jsResponse = await response.json();
            if (jsResponse.status === 200){
            // This determines if <FormDiv> will be moved left
                if (mql.matches){
                        setIsBooped(true);
                        setAnimationGo(true);
                }
            let quotesArray = [];
            let priority;
            let xpress;
            let regular;
            let sortedArray = [];
            Object.entries(jsResponse.data).forEach((el) => {
                if (el[1].LAD){
                    el[1].deliveryOption = el[1].LAD;
                    delete el[1].LAD;
                }
                else if (el[1].SO){
                    el[1].deliveryOption = el[1].SO;
                    delete el[1].SO;
                }
                else if (el[1].PA18){
                    el[1].deliveryOption = el[1].PA18;
                    delete el[1].PA18;
                }
                else if (el[1].PA19){
                    el[1].deliveryOption = el[1].PA19;
                    delete el[1].PA19;
                }
                quotesArray.push(el[1]);
            });
            quotesArray.forEach((el) => {
                if (el.serviceName === "Priority"){
                    priority = el;
                }
                if (el.serviceName === "Xpresspost"){
                    xpress = el;
                }
                if (el.serviceName === "Regular Parcel"){
                    regular = el;
                }
            });
            sortedArray.push(priority);
            sortedArray.push(xpress);
            sortedArray.push(regular);
            setQuotes(sortedArray);
            setTimeout(() => {
                setQuotesReceived(true);
                }, 1000);
            }
            else {
                setQuoteFail(true);
            }
        } catch (err) {
            console.log(err);
        }
    };
    
    async function handleFormSubmit(event) {
        event.preventDefault();
        await submitForm(event.target);
    };

    return (
        <Wrapper>
        {mql.matches
            ?<DesktopShippingForm
                isBooped={isBooped}
                handleChange={handleChange}
                handleFormSubmit={handleFormSubmit}
                setNewMailInfo={setNewMailInfo}
                newMailInfo={newMailInfo}
                quoteFail={quoteFail}
                animationGo={animationGo}
                animationComplete={animationComplete}
            />
            :<MobileShippingForm
                isBooped={isBooped}
                handleChange={handleChange}
                handleFormSubmit={handleFormSubmit}
                setNewMailInfo={setNewMailInfo}
                newMailInfo={newMailInfo}
                quoteFail={quoteFail}
                />
        }
        { quotesReceived 
        && quotes 
        && !quoteFail &&
        // &&  allowQuotes &&
            <QuotesDiv>
                    {quotes.map((el) => {
                        return (
                            <QuoteDiv key={el.basePrice}>
                                <ServiceName>{el.serviceName}</ServiceName>
                                {el.PA18 &&
                                    <p>Delivery type: {el.PA18[1]}</p>
                                }
                                {el.PA19 &&
                                    <p>Delivery type: {el.PA19[1]}</p>
                                }
                                {!el.PA18 && !el.PA19 &&
                                    <p>Delivery type: {el.deliveryOption[1]}</p>
                                }
                                <div>
                                    <p>Price:</p>
                                    <ul>
                                        <li>Base price: ${el.basePrice}</li>
                                        <li>Fuel surcharge: ${el.surchargeAmount}</li>
                                        <li>HST: ${el.hst}</li>
                                        <li><b>Total cost:</b> ${el.amountDue}</li>
                                    </ul>
                                </div>
                                <p>Expected transit time: {el.transitTime} days</p>
                                <p>Expected delivery date: {el.deliveryDate}</p>
                                <p>Confirmation of delivery:  {el.DC? "Yes" : "No"}</p>
                            </QuoteDiv>
                        )
                    })}
            </QuotesDiv>
            }
        </Wrapper>
    );
};

export default Shipping;

const fadeInAnimation = keyframes`
    0% {
        opacity: 0;
        }
    100% {
        opacity: 1;
    }
`;

const Wrapper = styled.div`
`;
const QuotesDiv = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    animation-name: ${fadeInAnimation};
    animation-duration: 2s;
    @media (max-width: 1099px){
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 725px;
        margin-top: 40px;
    }
    @media (min-width: 1100px){
        position: absolute;
        top: 100px;
        left: 675px;
        max-width: 1200px;
    }
    border-radius: 15px;
    min-width: 300px;
    min-height: 250px;
    background-color: var(--primary-div-colour);
    box-shadow: var(--standard-box-shadow);
    padding: 11px 0px 11px 0px;
`;
const QuoteDiv = styled.div`
    margin: 15px 15px;
    padding: 10px 20px 20px 20px;
    border-radius: 15px;
    box-shadow: var(--standard-box-shadow);
`;
const ServiceName = styled.h3`
    text-align: center;
`;