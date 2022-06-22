import React from "react";
import styled, {keyframes} from "styled-components";

const DesktopShippingForm = (props) => {
    const {
        isBooped,
        handleChange,
        handleFormSubmit,
        setNewMailInfo,
        newMailInfo,
        quoteFail,
        animationGo,
        animationComplete
    } = props;

    return (
        <>
        {animationGo || animationComplete
        ?   <AnimatedFormDiv>
                <StyledH2>
                    Get Canada Post Shipping Quotes
                </StyledH2>
                <ShippingForm onSubmit={handleFormSubmit}>
                    <TextArea
                        type="text"
                        name="startingPC"
                        placeholder="Starting postal code"
                        onChange={(ev) => {
                            let targetValue = "startingPC";
                            handleChange(ev, targetValue);
                        }}
                        required
                    />
                    <TextArea
                        type="text"
                        name="destinationPC"
                        placeholder="Destination postal code"
                        onChange={(ev) => {
                            let targetValue = "destinationPC";
                            handleChange(ev, targetValue);
                        }}
                    />
                    <TextArea
                        type="text"
                        name="expectedMailingDate"
                        placeholder="Expected mailing date (YYYY-MM-DD)"
                        onChange={(ev) => {
                            let targetValue = "expectedMailingDate";
                            handleChange(ev, targetValue);
                        }}
                    />
                    <TextArea
                        type="text"
                        name="weight"
                        placeholder="Weight (in kilograms)"
                        onChange={(ev) => {
                            let targetValue = "weight";
                            handleChange(ev, targetValue);
                        }}
                    />
                    <TextArea
                        type="text"
                        name="length"
                        placeholder="Length (in centimeters)"
                        onChange={(ev) => {
                            let targetValue = "length";
                            handleChange(ev, targetValue);
                        }}
                    />
                    <TextArea
                        type="text"
                        name="width"
                        placeholder="Width (in centimeters)"
                        onChange={(ev) => {
                            let targetValue = "width";
                            handleChange(ev, targetValue);
                        }}
                    />
                    <TextArea
                        type="text"
                        name="height"
                        placeholder="Height (in centimeters)"
                        onChange={(ev) => {
                            let targetValue = "height";
                            handleChange(ev, targetValue);
                        }}
                    />
                    <RadioDiv onChangeValue>
                        <FormParagraph>
                            Please choose delivery option:
                        </FormParagraph>
                        <InputDiv>
                            <input  
                                required
                                type="radio" 
                                id="LAD" 
                                name="deliveryOption" 
                                value="LAD"
                                onChange={() => {
                                    setNewMailInfo({...newMailInfo, ["deliveryOption"]: "LAD"});
                                }}
                            />
                            <label for="LAD">Leave at door</label>
                        </InputDiv>
                        <InputDiv>
                            <input 
                                type="radio" 
                                id="SO" 
                                name="deliveryOption" 
                                value="SO"
                                onChange={() => {
                                    setNewMailInfo({...newMailInfo, ["deliveryOption"]: "SO"});
                                }}
                            />
                            <label for="SO">Signature Required</label>
                        </InputDiv>
                        <InputDiv>
                            <input 
                                type="radio" 
                                id="PA18" 
                                name="deliveryOption" 
                                value="PA18"
                                onChange={() => {
                                    setNewMailInfo({...newMailInfo, ["deliveryOption"]: "PA18"});
                                }}
                            />
                            <label for="PA18">Proof of age required (18+)</label> 
                        </InputDiv>
                        <InputDiv>
                            <input 
                                type="radio" 
                                id="PA19" 
                                name="deliveryOption" 
                                value="PA18"
                                onChange={() => {
                                    setNewMailInfo({...newMailInfo, ["deliveryOption"]: "PA19"});
                                }}
                            />
                            <label for="PA19">Proof of age required (19+)</label> 
                        </InputDiv>
                    </RadioDiv>
                    {quoteFail && 
                        <BadInfoPar>
                            Unable to fetch quotes. Please double check inputs.<br/>
                            Shipping date must not be in the past.
                        </BadInfoPar>
                    }
                    <SubmitButton
                        type="submit"
                        value="Click here for shipping estimates!"
                    />
                </ShippingForm>
            </AnimatedFormDiv>
        :   <FormDiv>
                <StyledH2>
                    Get Canada Post Shipping Quotes
                </StyledH2>
                <ShippingForm onSubmit={handleFormSubmit}>
                    <TextArea
                        type="text"
                        name="startingPC"
                        placeholder="Starting postal code"
                        onChange={(ev) => {
                            let targetValue = "startingPC";
                            handleChange(ev, targetValue);
                        }}
                        required
                    />
                    <TextArea
                        type="text"
                        name="destinationPC"
                        placeholder="Destination postal code"
                        onChange={(ev) => {
                            let targetValue = "destinationPC";
                            handleChange(ev, targetValue);
                        }}
                    />
                    <TextArea
                        type="text"
                        name="expectedMailingDate"
                        placeholder="Expected mailing date (YYYY-MM-DD)"
                        onChange={(ev) => {
                            let targetValue = "expectedMailingDate";
                            handleChange(ev, targetValue);
                        }}
                    />
                    <TextArea
                        type="text"
                        name="weight"
                        placeholder="Weight (in kilograms)"
                        onChange={(ev) => {
                            let targetValue = "weight";
                            handleChange(ev, targetValue);
                        }}
                    />
                    <TextArea
                        type="text"
                        name="length"
                        placeholder="Length (in centimeters)"
                        onChange={(ev) => {
                            let targetValue = "length";
                            handleChange(ev, targetValue);
                        }}
                    />
                    <TextArea
                        type="text"
                        name="width"
                        placeholder="Width (in centimeters)"
                        onChange={(ev) => {
                            let targetValue = "width";
                            handleChange(ev, targetValue);
                        }}
                    />
                    <TextArea
                        type="text"
                        name="height"
                        placeholder="Height (in centimeters)"
                        onChange={(ev) => {
                            let targetValue = "height";
                            handleChange(ev, targetValue);
                        }}
                    />
                    <RadioDiv onChangeValue>
                        <FormParagraph>
                            Please choose delivery option:
                        </FormParagraph>
                        <InputDiv>
                            <input  
                                required
                                type="radio" 
                                id="LAD" 
                                name="deliveryOption" 
                                value="LAD"
                                onChange={() => {
                                    setNewMailInfo({...newMailInfo, ["deliveryOption"]: "LAD"});
                                }}
                            />
                            <label for="LAD">Leave at door</label>
                        </InputDiv>
                        <InputDiv>
                            <input 
                                type="radio" 
                                id="SO" 
                                name="deliveryOption" 
                                value="SO"
                                onChange={() => {
                                    setNewMailInfo({...newMailInfo, ["deliveryOption"]: "SO"});
                                }}
                            />
                            <label for="SO">Signature Required</label>
                        </InputDiv>
                        <InputDiv>
                            <input 
                                type="radio" 
                                id="PA18" 
                                name="deliveryOption" 
                                value="PA18"
                                onChange={() => {
                                    setNewMailInfo({...newMailInfo, ["deliveryOption"]: "PA18"});
                                }}
                            />
                            <label for="PA18">Proof of age required (18+)</label> 
                        </InputDiv>
                        <InputDiv>
                            <input 
                                type="radio" 
                                id="PA19" 
                                name="deliveryOption" 
                                value="PA18"
                                onChange={() => {
                                    setNewMailInfo({...newMailInfo, ["deliveryOption"]: "PA19"});
                                }}
                            />
                            <label for="PA19">Proof of age required (19+)</label> 
                        </InputDiv>
                    </RadioDiv>
                    {quoteFail && 
                        <BadInfoPar>
                            Unable to fetch quotes. Please double check inputs.<br/>
                            Shipping date must not be in the past.
                        </BadInfoPar>
                    }
                    <SubmitButton
                        type="submit"
                        value="Click here for shipping estimates!"
                    />
                </ShippingForm>
            </FormDiv>
        }
</>
    )
}

export default DesktopShippingForm;

const movementAnimation = keyframes `
    0% {
        left: 50%;
        transform: translateX(-50%);
    }
    100% {
        left: 30px;
        transform: translateX(0%);
    }
    
`;

const FormDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    min-width: 300px;
    width: 55vw;
    max-width: 600px;
    min-height: 250px;
    background-color: var(--primary-div-colour);
    box-shadow: var(--standard-box-shadow);
    padding: 0px 0px 20px 0px;
    /* @media (min-width: 1200px){
        left: 30px;
    } */
`;
const AnimatedFormDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 100px;
    left: 50%;
    border-radius: 15px;
    min-width: 300px;
    width: 55vw;
    max-width: 600px;
    min-height: 250px;
    background-color: var(--primary-div-colour);
    box-shadow: var(--standard-box-shadow);
    padding: 0px 0px 20px 0px;
    animation-name: ${movementAnimation};
    animation-duration: 1500ms;
    animation-fill-mode: forwards;
`;
const StyledH2 = styled.h2`
    text-align: center;
`;
const ShippingForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 20px;
    padding: 0px 0px 20px 0px;
`;
const TextArea = styled.input`
    height: 30px;
    width: 80%;
    border-radius: 5px;
    font-size: 1rem;
`;
const FormParagraph = styled.p`
`;
const RadioDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    border-radius: 5px;
    font-size: 1rem;
`;
const InputDiv = styled.div`
`;
const BadInfoPar = styled.p`
    color: red;
`;
const SubmitButton = styled.input`
    text-align: center;
    margin-top: 25px;
    border-radius: 8px;
    height: 80px;
    padding: 0px 20px;
    font-size: 1rem;
    @media (max-width: 600px) {
        width: 105%;
        padding: 0px 5px;
    }
    border: 2px solid rgb(43, 43, 216, 0.5);
    box-shadow: 2px 2px 2px 2px rgb(43, 43, 216, 0.2),
        -2px -2px 2px 2px rgb(43, 43, 216, 0.2);
`;