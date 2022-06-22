import React, { createContext, useState } from "react";

export const UserContext = createContext(null);

const UserProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState(
        {
            firstName: false,
            lastName: false,
            userName: false,
            password: false,
            email: false,
            streetAddress: false,
            postalCode: false,
            creditCardNo: false,
            ccv: false,
            friends: false,
            messages: false,
        }
    );
    const [signInData, setSignInData] = useState(
        {
            userName: false,
            password: false,
        }
    );
    const [rollingUserInfo, setRollingUserInfo] = useState(null);
    const [signedIn, setSignedIn] = useState(false);
    const [newMailInfo, setNewMailInfo] = useState(
        {
            startingPC: false,
            destinationPC: false,
            expectedMailingDate: false,
            deliveryOption: false,
            weight: false,
            length: false,
            width: false,
            height: false,
        }
    );

    async function updateMsgs(){
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName : userInfo.userName,
                password: signInData.password,
            }),
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
            }
        } catch (err) {
            console.log(err);
        }
    }

    const logUserOut = () => {
        setUserInfo({
            ...userInfo,
            firstName: false,
            lastName: false,
            userName: false,
            password: false,
            email: false,
            streetAddress: false,
            postalCode: false,
            creditCardNo: false,
            ccv: false,
            friends: false,
            messages: false,
        })
        setSignedIn(false);
        setSignInData( {
            ...signInData,
            userName: false,
            password: false,
        })
    }

    return (
        <UserContext.Provider
            value={{
            userInfo,
            setUserInfo,
            signedIn,
            setSignedIn,
            signInData,
            setSignInData,
            logUserOut,
            rollingUserInfo,
            setRollingUserInfo,
            updateMsgs,
            newMailInfo,
            setNewMailInfo
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;