import React, {useContext, useState} from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

    const { 
        userInfo,
        setUserInfo,
        setSignedIn,
        signInData,
        setSignInData,
        } = useContext(UserContext);
    const [signInFail, setSignInFail] = useState(false);

    let navigate = useNavigate();

    function handleChange(ev, key){
        setSignInData({...signInData, [key]: ev.target.value});
    };
    
    async function handleSignIn(event) {
        setSignInFail(false);
        event.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signInData),
        };
        try {
            const response = await fetch("/getUser", options);
            const jsResponse = await response.json(); 
            if (jsResponse.status === 200){
                let newArray = [];
                for (let i = jsResponse.data.messages.length -1; i >= 0; i--){
                    newArray.push(jsResponse.data.messages[i]);
                }
                jsResponse.data.messages = newArray;
                setUserInfo(jsResponse.data);
                setSignedIn(true);
                navigate("/");
            }
            else {
                setSignInFail(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Wrapper>
            <StyledH1>Sign In</StyledH1>
            <SignInForm 
            onSubmit={handleSignIn}
            >    
                <TextArea
                    type="text"
                    name="userName"
                    placeholder="Username"
                    onChange={(ev) => {
                        let targetValue = "userName";
                        handleChange(ev, targetValue);
                    }}
                />
                <TextArea
                    type="text"
                    name="password"
                    placeholder="Password"
                    onChange={(ev) => {
                        let targetValue = "password";
                        handleChange(ev, targetValue);
                    }}
                />
                {signInFail &&
                    <BadInfoPar>
                        Unable to sign you in. Please check credentials and try again.
                    </BadInfoPar>
                }
                <SubmitButton
                    type="submit"
                    value="Sign In"
                />
            </SignInForm>
            <p>Not registered? Click <NavLink to="/sign-up">here</NavLink> to create an account.</p>
        </Wrapper>
    );
};

export default SignIn;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    width: 55vw;
    max-width: 600px;
    height: 40vh;
    min-height: 250px;
    background-color: var(--primary-div-colour);
    box-shadow: var(--standard-box-shadow);
    padding: 20px;
`;
const StyledH1 = styled.h1`
`;
const SignInForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 50%;
    min-height: 100px;
    border-radius: 15px;
    box-shadow: 2px 2px 2px 2px rgb(43, 43, 216, 0.2),
        -2px -2px 2px 2px rgb(43, 43, 216, 0.2);
    padding: 20px;
`;
const TextArea = styled.input`
    height: 30px;
    width: 80%;
    border-radius: 5px;
    font-size: 1rem;
    text-align: center;
`;
const BadInfoPar = styled.p`
    color: red;
`;
const FormParagraph = styled.p`
`;
const SubmitButton = styled.input`
    margin-top: 10px;
    border-radius: 8px;
    height: 40px;
    padding: 0px 20px;
    font-size: 1rem;
    border: 2px solid rgb(43, 43, 216, 0.5);
    box-shadow: 2px 2px 2px 2px rgb(43, 43, 216, 0.2),
        -2px -2px 2px 2px rgb(43, 43, 216, 0.2);
    width: 50%;
    align-self: center;
`;