'use client'
import styled from "styled-components";
import HeaderComponent from "../organisms/header/header";
import SideBarComponent from "../organisms/sidebar/sidebar";

interface ILayout {
    children: React.ReactNode;
}

const StylesLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background-color: white;
`;

const StyledMain = styled.main`
    display: flex;
`;

export default function Layout({ children }: ILayout) {
    return (
        <StylesLayout>
            <HeaderComponent />
            <StyledMain>
                <SideBarComponent />
                {children}
            </StyledMain>
        </StylesLayout>
    )
}