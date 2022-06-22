import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./UserContext";

const Header = () => {

    const {signedIn} = useContext(UserContext);

    if (!signedIn) {
        return (
            <Wrapper>
                <NavLink to="/">
                    <HeaderSpan>CarePackageConnect</HeaderSpan>
                </NavLink>
                <NavLink to="/sign-in">
                    <HeaderSpan>Sign In</HeaderSpan>
                </NavLink>
            </Wrapper>
        )
    }
    else if (signedIn){
        return (
            <Wrapper>
                <NavLink to="/">
                    <HeaderSpan>Your Account</HeaderSpan>
                </NavLink>
                <NavLink to="/messaging">
                    <HeaderSpan>Messaging</HeaderSpan>
                </NavLink>
                <NavLink to="/shipping">
                    <HeaderSpan>Shipping</HeaderSpan>
                </NavLink>
                <NavLink to="/friends">
                    <HeaderSpan>Friends</HeaderSpan>
                </NavLink>
            </Wrapper>
        )
    }
};

export default Header;

const Wrapper = styled.div`
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--header-colour);
    font-size: 1.9rem;
    font-family: var(--font-header);
    @media (max-width: 600px) {
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
    }
`;
const NavLinky = styled(NavLink)`
    text-decoration: none;
    margin: 0px 50px;
`;

const HeaderSpan = styled.span`
    text-decoration: none;
    margin: 0px 50px;
    @media (max-width: 1200px) {
        align-items: center;
        justify-content: space-around;
        margin: 5px 15px;
        font-size: 1.2rem;
    }
    @media (max-width: 600px) {
        align-items: center;
        justify-content: center;
        margin: 5px 15px;
        font-size: 1rem;
    }
    color: silver;
`;
