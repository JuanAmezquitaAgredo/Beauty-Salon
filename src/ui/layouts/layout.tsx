'use client'
import styled from "styled-components";
import HeaderComponent from "../organisms/header/header";
import SideBarComponent from "../organisms/sidebar/sidebar";
import { Suspense } from "react";
import Loading from "@/app/loading";

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
                <Suspense fallback={<Loading />}>
                    <SideBarComponent />
                    {children}
                </Suspense>
            </StyledMain>
        </StylesLayout>
    )
}