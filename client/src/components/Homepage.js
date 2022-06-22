import React, { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "./UserContext";
import styled from "styled-components";

const Homepage = () => {

    const {userInfo, signedIn, logUserOut} = useContext(UserContext);
    const [activateModal, setActivateModal] = useState(false);
    let navigate = useNavigate();

    if (!signedIn && !userInfo.firstName){
        return (
            <StartingWrapper>
                <StartingHeading>
                    Welcome to CarePackageConnect!
                </StartingHeading>
            </StartingWrapper>
        );
    }

    if (signedIn && userInfo.firstName){
        return (
            <>
                <Wrapper>
                    <Heading>Welcome back, {userInfo.firstName +" "+userInfo.lastName}!</Heading>
                    <UserInfoDiv>
                        <ProfileHeading>Your Account Info</ProfileHeading>
                        <ProfilePic src ={userInfo.avatarUrl}/>
                        <ProfileParDiv>
                            <ProfilePar><b>User name:</b> {userInfo.userName}</ProfilePar>
                            <ProfilePar><b>First name:</b> {userInfo.firstName}</ProfilePar>
                            <ProfilePar><b>Last name:</b> {userInfo.lastName}</ProfilePar>
                            <ProfilePar><b>Street Address:</b> {userInfo.streetAddress}</ProfilePar>
                            <ProfilePar><b>Postal Code:</b> {userInfo.postalCode}</ProfilePar>
                        </ProfileParDiv>
                    </UserInfoDiv>
                    <LogOutDiv>
                        <LogOutButton
                        onClick={() => setActivateModal(true)}>
                            Log Out
                        </LogOutButton>
                    </LogOutDiv>
                </Wrapper>
                {activateModal && 
                    <ModalWrapper>
                        <LogOutButtonDiv>
                        <LogoutPar>
                            Are you sure you want to log out?
                        </LogoutPar>
                            <YetAnotherButtonDiv>
                                <LogOutButton
                                onClick={() => {
                                    logUserOut();
                                    navigate("/");
                                }}>
                                    Yes
                                </LogOutButton>
                                <LogOutButton
                                onClick={() => setActivateModal(false)}>
                                    No
                                </LogOutButton>
                            </YetAnotherButtonDiv>
                        </LogOutButtonDiv>
                    </ModalWrapper>
                }
            </>
        );
    }
};

export default Homepage;

const StartingWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 15px;
    background-color: var(--primary-div-colour);
    box-shadow: var(--standard-box-shadow);
    padding: 20px;
    @media (max-width: 600px) {
        width:80vw;
        font-size: 0.7rem;
    }
`;
const StartingHeading = styled.h1`
    text-align: center;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    width: 50vw;
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
    @media (max-width: 600px) {
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        text-align: center;
    }
`;
const ProfileHeading = styled.h2`
    text-align: center;
    align-self: center;
`;
const LogOutDiv = styled.div`
align-self: center;
margin-top: 40px;
`;
const ConfirmButton = styled.button`
`;
const LogOutButton = styled.button`
    font-size: 1rem;
    border-radius: 50%;
    height: 80px;
    width: 80px;
    border: 2px solid rgb(43, 43, 216, 0.5);
    box-shadow: 2px 2px 2px 2px rgb(43, 43, 216, 0.2),
        -2px -2px 2px 2px rgb(43, 43, 216, 0.2);
`;
const ModalWrapper = styled.div`
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 95px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    width: 51vw;
    height: 750px;
    min-height: 250px;
    background-color: gray;
    box-shadow: var(--standard-box-shadow);
    padding: 0px 0px 20px 0px;
    @media (max-width: 600px) {
        width:95vw;
    }
    background-image: linear-gradient(
        45deg,
        hsl(0deg 100% 20%) 0%,
        hsl(330deg 100% 19%) 21%,
        hsl(314deg 100% 18%) 30%,
        hsl(300deg 100% 16%) 39%,
        hsl(287deg 100% 19%) 46%,
        hsl(278deg 100% 21%) 54%,
        hsl(270deg 100% 23%) 61%,
        hsl(263deg 100% 25%) 69%,
        hsl(256deg 100% 27%) 79%,
        hsl(245deg 100% 28%) 100%
    );
    opacity: 0.9;
`;
const LogOutButtonDiv = styled.div`
    position: absolute;
    top: 26vh;
    left: 50%;
    transform: translateX(-50%);
`;
const LogoutPar = styled.p`
    color: white;
    font-size: 1.3rem;
    text-align: center;
`;
const YetAnotherButtonDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
`;
const UserInfoDiv = styled.div`
display: flex;
flex-direction: column;
align-items: baseline;
justify-content: center;
margin-left: 5px;
`;
const ProfilePic = styled.img`
    align-self: center;
    max-height: 200px;
    border-radius: 10px;
`;
const ProfileParDiv = styled.div`
    margin-top: 20px;
`;
const ProfilePar = styled.p`
`;