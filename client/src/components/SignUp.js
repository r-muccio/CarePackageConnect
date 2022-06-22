import React, {useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const SignUp = () => {

    const [newUserInfo, setNewUserInfo] = useState(
        {
            firstName: false,
            lastName: false,
            userName: false,
            avatarUrl: false,
            password: false,
            email: false,
            streetAddress: false,
            postalCode: false,
            creditCardNo: false,
            ccv: false,
            friends: ["hey", "heyo", {boop: "boop boop"}],
        }
    );
    const [userNameTaken, setUserNameTaken] = useState(false);

    let navigate = useNavigate();

    async function submitForm(target){
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserInfo),
        };        
        try {
            const response = await fetch("/createUser", options);
            const jsResponse = await response.json();    
            if (response.status === 201 && !jsResponse.nameTaken){
                navigate("/sign-in");
            }
            else if (jsResponse.nameTaken){
                setUserNameTaken(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    function handleChange(ev, key){
        setNewUserInfo({...newUserInfo, [key]: ev.target.value});
    };
    
    async function handleFormSubmit(event) {
        event.preventDefault();
        await submitForm(event.target);
    };

    return (
        <Wrapper>
            <StyledH2>Create Your CarePackageConnect Account</StyledH2>
            <SignUpForm onSubmit={handleFormSubmit}>
                <TextArea
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={(ev) => {
                        let targetValue = "firstName";
                        handleChange(ev, targetValue);
                    }}
                    required
                />
                <TextArea
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={(ev) => {
                        let targetValue = "lastName";
                        handleChange(ev, targetValue);
                    }}
                    required
                />
                <TextArea
                    type="text"
                    name="avatarUrl"
                    placeholder="avatarUrl"
                    onChange={(ev) => {
                        let targetValue = "avatarUrl";
                        handleChange(ev, targetValue);
                    }}
                    required
                />
                <TextArea
                    type="text"
                    name="userName"
                    placeholder="User Name (visible to others)"
                    onChange={(ev) => {
                        let targetValue = "userName";
                        handleChange(ev, targetValue);
                    }}
                    required
                />
                {userNameTaken && 
                    <FormWarningParagraph>
                        This username is taken. Please try a different username.
                    </FormWarningParagraph>
                }
                <TextArea
                    type="text"
                    name="password"
                    placeholder="Password"
                    onChange={(ev) => {
                        let targetValue = "password";
                        handleChange(ev, targetValue);
                    }}
                    required
                />
                <TextArea
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={(ev) => {
                        let targetValue = "email";
                        handleChange(ev, targetValue);
                    }}
                    required
                />
                <TextArea
                    type="text"
                    name="streetAddress"
                    placeholder="Street address"
                    onChange={(ev) => {
                        let targetValue = "streetAddress";
                        handleChange(ev, targetValue);
                    }}
                    required
                />
                <TextArea
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    onChange={(ev) => {
                        let targetValue = "postalCode";
                        handleChange(ev, targetValue);
                    }}
                    required
                />
                <TextArea
                    type="text"
                    name="creditCardNo"
                    placeholder="Credit Card Number"
                    onChange={(ev) => {
                        let targetValue = "creditCardNo";
                        handleChange(ev, targetValue);
                    }}
                />
                <TextArea
                    type="text"
                    name="ccv"
                    placeholder="Card Verification Value (CCV)"
                    onChange={(ev) => {
                        let targetValue = "ccv";
                        handleChange(ev, targetValue);
                    }}
                />
                <FormParagraph>
                Your credit card information is required to purchase and print shipping labels at home.
                </FormParagraph>
                <SubmitButton
                    type="submit"
                    value="Click here to create your account"
                />
            </SignUpForm>
        </Wrapper>
    );
};

export default SignUp;

const Wrapper = styled.div`
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
`;
const StyledH2 = styled.h2`
    text-align: center;
`;
const SignUpForm = styled.form`
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
    text-align: center;
    margin: 20px 50px;
`;
const FormWarningParagraph = styled.p`
color: red;
`;
const SubmitButton = styled.input`
    margin-top: 10px;
    border-radius: 8px;
    height: 80px;
    padding: 0px 20px;
    font-size: 1rem;
    border: 2px solid rgb(43, 43, 216, 0.5);
    box-shadow: 2px 2px 2px 2px rgb(43, 43, 216, 0.2),
        -2px -2px 2px 2px rgb(43, 43, 216, 0.2);
`;
