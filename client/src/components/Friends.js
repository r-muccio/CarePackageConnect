import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import styled from "styled-components";

const Friends = () => {
    const {
            userInfo, 
            setUserInfo,
            signedIn, 
            signInData,
        } = useContext(UserContext);
    const [targetUser, setTargetUser] = useState(null);
    const [friendFinding, setFriendFinding] = useState({
        noHits: false,
        userFound: false,
        userName: null,
        userAdded: false,
    });
    const [targetFriendForDeletion, setTargetFriendForDeletion] = useState(null);
    const [deleteFailed, setDeleteFailed] = useState({
        failure: false,
        failureMsg: "Failed to delete user. Please double-check spelling of user name."
    });

    const getRollingUserInfo = async () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signInData),
        };
        const response = await fetch("/getUser", options);
        const jsResponse = await response.json(); 
        setUserInfo({...userInfo, friends: jsResponse.data.friends});
    };

    function handleChange(ev, key){
        setTargetUser(ev.target.value);
    };

    async function searchForUser(input){
        setFriendFinding(
            {
            ...friendFinding,
            noHits: false,
            duplicate: false,
            userAdded: false,
            userName: null,
            }
        );
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userName: input}),
        };
        try {
            const response = await fetch("/searchForUser", options);
            const jsResponse = await response.json(); 
            if (jsResponse.found){
                setFriendFinding({
                    ...friendFinding,
                    noHits: false,
                    userFound: true,
                    duplicate:false,
                    userAdded: false,
                    userName: jsResponse.data,
                });
            }
            else if (!jsResponse.found){
                setFriendFinding({
                    ...friendFinding,
                    noHits: true,
                    userAdded: false,
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function addFriend(currentUser,targetUser){
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                currentUser: currentUser,
                targetUser: targetUser,
            }),
        };
        try {
            const response = await fetch("/addFriend", options);
            const jsResponse = await response.json(); 
            if (jsResponse.found){
                setFriendFinding({
                    ...friendFinding,
                    noHits: false,
                    userFound: false,
                    userName: jsResponse.targetUser,
                    userAdded: true,
                });
                getRollingUserInfo();
            }
            else if (!jsResponse.found){
                if (jsResponse.duplicate){
                    setFriendFinding({
                        ...friendFinding,
                        noHits: false,
                        duplicate: true,
                    });
                }
                else{
                    setFriendFinding({
                        ...friendFinding,
                        noHits: true,
                    });
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    async function deleteFriend(currentUser,targetUser){
        setDeleteFailed({...deleteFailed, failure : false});
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                currentUser: currentUser,
                targetUser: targetUser,
            }),
        };
        try {
            const response = await fetch("/deleteFriend", options);
            const jsResponse = await response.json(); 
                setUserInfo({...userInfo, friends: jsResponse.data.friends});
        } catch (err) {
            console.log(err);
            setDeleteFailed({...deleteFailed, failure : true});
        }
    };

    function doNotAddFriend(){
        setFriendFinding({
            ...friendFinding,
            noHits: false,
            userFound: false,
            userName: null,
            userAdded: false,
        });
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
                <AddAndRemoveFriends>
                    <SearchDiv>
                        <FriendH2>Add a friend</FriendH2>
                        <TextArea
                        name="userName"
                        placeholder="Enter user name"
                        onChange={(ev) => {
                            let targetValue = "userName";
                            handleChange(ev, targetValue);
                        }}
                        />
                        <FindFriendButton
                        onClick={() => searchForUser(targetUser)}>
                            Search
                        </FindFriendButton>
                        {friendFinding.noHits && 
                            <BadInfoPar>User not found. Please try again.</BadInfoPar>
                        }
                        {friendFinding.userFound &&
                        friendFinding.userName &&
                        !friendFinding.duplicate &&
                            <AddFriendDiv>
                                <GoodInfoPar>
                                    User {friendFinding.userName} was found.
                                    Add this user to your Friends List?
                                </GoodInfoPar>
                                <AddFriendButtonsDiv>
                                    <AddFriendButton
                                    onClick={() => addFriend(userInfo, friendFinding.userName)}>
                                        Yes
                                    </AddFriendButton>
                                    <AddFriendButton
                                    onClick={() => doNotAddFriend()}>
                                        No
                                    </AddFriendButton>
                                </AddFriendButtonsDiv>
                            </AddFriendDiv>
                        }
                        {friendFinding.userAdded &&
                            <GoodInfoPar>User {friendFinding.userName} has been added to your friends list.</GoodInfoPar>
                        }
                        {friendFinding.duplicate &&
                            <BadInfoPar> You are already friends with {friendFinding.userName}.</BadInfoPar>
                        }
                    </SearchDiv>
                    <SearchDiv>
                        <FriendH2>Remove a friend</FriendH2>
                        <TextArea
                        name="userName"
                        placeholder="Enter user name"
                        onChange={(ev) => {
                            let targetValue = "userName";
                            setTargetFriendForDeletion(ev.target.value);
                        }}
                        />
                        <FindFriendButton
                        onClick={() => deleteFriend(userInfo, targetFriendForDeletion)}>
                            Delete friend
                        </FindFriendButton>
                        {deleteFailed.failure &&
                            <BadInfoPar>{deleteFailed.failureMsg}</BadInfoPar>
                        }
                    </SearchDiv>
                </AddAndRemoveFriends>
                
                <YourFriendsDiv>
                    <h1>Your Friends</h1>
                    <FriendMapDiv>
                        {userInfo.friends.map((el) => {
                            return (
                                <FriendWrapper key={Math.floor(Math.random() * 1000000)}>
                                    <FriendAvatar src={el.friendAvatar} />
                                    <FriendUsernameDiv>{el.friendUsername}</FriendUsernameDiv>
                                </FriendWrapper>
                            );
                        })}
                    </FriendMapDiv>
                </YourFriendsDiv>
            </Wrapper>
            
        );
    }

}

export default Friends;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    @media (max-width: 999px){
        flex-direction: column;
        align-items: center;
    }
`;
const AddAndRemoveFriends = styled.div`
    display: flex;
    justify-content: center;
    box-shadow: var(--standard-box-shadow);
    border-radius: 15px;
    padding: 11px 0px 11px 0px;
    background-color: var(--primary-div-colour);
    width: 250px;
    @media (max-width: 999px){
        flex-direction: row;
        width: 95vw;
        margin-top: 20px;
    }
    @media (max-width:399px) {
        flex-direction: column;
    }
    @media (min-width: 1000px){
        position: absolute;
        flex-direction: column;
        top: 100px;
        left: 25px;
        min-height: 100px;
    }
`;
const SearchDiv = styled.div`
    background-color: var(--primary-div-colour);
    @media (max-width: 999px){
        width: 50%;
    }
    @media (max-width:399px) {
        width: 80%;
    }
    @media (min-width: 1000px){
        height: 310px;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px 15px;
    padding: 10px 20px 20px 20px;
    border-radius: 15px;
    box-shadow: var(--standard-box-shadow);
`;
const FindFriendButton = styled.button`
`;
const AddFriendButton = styled.button`
`;
const BadInfoPar = styled.p`
    color:red;
`;
const GoodInfoPar = styled.p`
`;
const AddFriendDiv = styled.div`
    display: flex;
    flex-direction: column;
`;
const AddFriendButtonsDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
`;
const YourFriendsDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    @media (max-width: 999px){
        justify-content: center;
        left: 50%;
        width: 90vw;
        margin-top: 40px;
    }
    @media (min-width: 1000px){
        flex-grow: 2;
        position: absolute;
        top: 100px;
        left: 325px;
        max-width: 80vw;
        min-height: 250px;
    }
    border-radius: 15px;
    min-width: 300px;
    min-height: 250px;
    background-color: var(--primary-div-colour);
    box-shadow: var(--standard-box-shadow);
    padding: 11px;
`;
const FriendMapDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
`;
const FriendH2 = styled.h2`
    text-align: center;
`;
const TextArea = styled.textarea`
    margin-bottom: 15px;
    width: 80%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid gray;
    font-family: var(--font-body);
    font-size: 1rem;
    align-self: center;
    text-align: center;
    @media (max-width: 999px) {
        width: 100%;
    }
`;
const FriendWrapper = styled.div`
    margin: 10px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const FriendAvatar = styled.img`
    height: 150px;
    border: 1px solid gray;
    border-radius: 8px;
`;
const FriendUsernameDiv = styled.div`
`;

const QuoteDiv = styled.div`
    margin: 15px 15px;
    padding: 10px 20px 20px 20px;
    border-radius: 15px;
    box-shadow: var(--standard-box-shadow);
`;