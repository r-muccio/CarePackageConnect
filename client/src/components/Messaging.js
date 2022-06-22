import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import styled from "styled-components";

const Messaging = () => {
    const {
        userInfo, 
        setUserInfo, 
        signInData, 
        signedIn, 
        updateMsgs, } = useContext(UserContext);
    const [recipientChosen, setRecipientChosen] = useState(false);
    const [recipient, setRecipient] = useState(false);
    const [message, setMessage] = useState("");

    async function sendMessage(){
        const timestamp = Math.floor(Date.now() / 1000);
        const time = new Date();
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                currentUser: userInfo.userName,
                currentUserAvatar: userInfo.avatarUrl,
                targetUser: recipient,
                msg: message,
                timestamp: timestamp,
                time: time
            }),
        };
        try {
            const response = await fetch("/sendMessage", options);
            const jsResponse = await response.json(); 
            setRecipient(false);
            setRecipientChosen(false);
            setMessage("");
            updateMsgs();
        } 
        catch (err) {
            console.log(err);
        }
    };
    

    if (!signedIn && !userInfo.firstName){
        return (
            <Wrapper>
                <h1>You must be signed in to view this page!</h1>
            </Wrapper>
        );
    }
    else if (signedIn && userInfo.firstName){
        return(
            <Wrapper>
                <Heading>Messaging</Heading>
                <InnerWrapper>
                    <MessagingDiv className="select-container">
                        <h2>Compose a message</h2>
                            <RecipientSelect
                            name="choose-recipient"
                            id="choose-recipient"
                            onChange={(ev) => {
                                setRecipient(ev.target.value);
                                setRecipient(ev.target.value);
                                setRecipientChosen(true);
                                }}>
                                <option value="" selected disabled hidden>Choose recipient</option>
                                {userInfo.friends.map((option) => {
                                    return(
                                        <option 
                                        key={option.friendUsername} 
                                        value={option.friendUsername}
                                        >
                                            {option.friendUsername}
                                        </option>
                                    )
                                })}
                            </RecipientSelect> 
                            {recipientChosen && 
                                    <TextArea
                                    name="userName"
                                    placeholder="Type your message here"
                                    onChange={(ev) => {
                                        setMessage(ev.target.value);
                                    }}
                                    />
                            }
                            {recipientChosen &&
                                <SendButton
                                onClick={sendMessage}>
                                    Send Message
                                </SendButton>
                            }
                    </MessagingDiv>
                    <MsgsDiv>
                    {userInfo.messages.length === 0 &&
                        <div>You have no messages to display</div>
                    }
                    {userInfo.messages.length > 0 &&  <h2>Received Messages</h2>}
                    {userInfo.messages &&
                    userInfo.messages.map((el) => {
                        return (
                            <MsgDiv key={el.timestamp}>
                                <UserDiv>
                                    <SenderPic src={el.senderAvatar}/>
                                    <SenderName>{el.from}</SenderName>
                                </UserDiv>
                                <RightSideDiv>
                                    <TextDiv>{el.msg}</TextDiv>
                                    <TimeDiv>{el.time}</TimeDiv>
                                </RightSideDiv>
                            </MsgDiv>
                        )
                    })}
                    </MsgsDiv>
                </InnerWrapper>
            </Wrapper>
        );
    }

}

export default Messaging;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    width: 90vw;
    min-height: 250px;
    background-color: var(--primary-div-colour);
    box-shadow: var(--standard-box-shadow);
    padding: 0px 0px 20px 0px;
    @media (max-width: 600px) {
        width:95vw;
    }
`;
const Heading = styled.h1`
    text-align: center;
    align-self: center;
    margin-bottom: 30px;
    @media (max-width: 600px) {
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        text-align: center;
    }
`;
const InnerWrapper = styled.div`
display: flex;
flex-direction: column;
width: 90%;
justify-content: space-evenly;
`;
const MessagingDiv = styled.div`
    box-shadow: 2px 2px 2px 2px rgb(43, 43, 216, 0.2),
        -2px -2px 2px 2px rgb(43, 43, 216, 0.2);
    margin-bottom: 50px;
    border-radius: 5px;
    padding-left: 15px;
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const InnerMessaginDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const RecipientSelect = styled.select`
    margin-bottom: 15px;
    align-self: start;
    height: 40px;
    border-radius: 8px;
    border: 1px solid gray;
    text-align: center;
    font-size: 1rem;
`;
const TextArea = styled.textarea`
    margin-bottom: 15px;
    width: 80%;
    height: 80px;
    border-radius: 8px;
    border: 1px solid gray;
    font-size: 1rem;
    align-self: center;
`;
const SendButton = styled.button`
    align-self: flex-end;
    height: 40px;
    border-radius: 8px;
    border: 1px solid gray;
    margin: 0px 75px 20px 0px;
`;
const MsgsDiv = styled.div`
    box-shadow: 2px 2px 2px 2px rgb(43, 43, 216, 0.2),
        -2px -2px 2px 2px rgb(43, 43, 216, 0.2);
    padding-left: 15px;
    border-radius: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
`;
const MsgDiv = styled.div`
    display: flex;
    margin: 20px 10px;
    align-self: start;
    width: 80%;
    border-bottom: 1px solid gray;
    border-left: 1px solid gray;
    border-radius: 3px;
`;
const UserDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const SenderPic = styled.img`
    height: 55px;
    border-radius: 8px;
`;
const SenderName = styled.div`
    margin: 10px 0 0 8px;
`;
const RightSideDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 2;
`;
const TextDiv = styled.div`
    width: 80%;
    margin: 0px 15px;
`;
const TimeDiv = styled.div`
    align-self: end;
`;