'use client'
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { FaSpa } from "react-icons/fa";
import styled from "styled-components";
import heroImage from "../../../../public/images/LoginPage.png";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["500", "700"] });

interface IAuthShell {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

const MOBILE = "@media (max-width: 900px)";

const Page = styled.div`
    min-height: 100vh;
    display: grid;
    grid-template-columns: minmax(380px, 42%) 1fr;
    background-color: #FAF3EF;
    overflow: hidden;

    & > * {
        min-width: 0;
    }

    ${MOBILE} {
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
    }
`;

const FormSide = styled.section`
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    padding: clamp(1.5rem, 5vw, 4.5rem);

    ${MOBILE} {
        order: 2;
        padding: 0.5rem 1rem 2.5rem;
    }
`;

const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: #D4AF37;
    font-size: 1.25rem;
    letter-spacing: 0.02em;
`;

const Heading = styled.h1`
    font-size: clamp(2rem, 3.2vw, 2.9rem);
    line-height: 1.15;
    color: #4A3B57;
`;

const Subtitle = styled.p`
    font-size: 1rem;
    line-height: 1.6;
    color: #7A6B85;
    max-width: 30rem;
    margin-top: 0.75rem;
`;

const Card = styled.div`
    width: 100%;
    max-width: 30rem;
    padding: 1.5rem 1.25rem;
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 1.25rem;
    box-shadow: 0 20px 45px -20px rgba(122, 91, 145, 0.35);
    backdrop-filter: blur(6px);
`;

const HeroSide = styled.div`
    position: relative;
    min-height: 100vh;

    /* Curva lila de fondo, un poco desplazada para dar profundidad */
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(160deg, #E9DDF1, #D9C6E6);
        clip-path: ellipse(98% 85% at 100% 50%);
        transform: translateX(-2.25rem);
    }

    ${MOBILE} {
        order: 1;
        min-height: 38vh;

        &::before {
            clip-path: ellipse(110% 100% at 50% 0%);
            transform: translateY(1rem);
        }
    }
`;

const ImageFrame = styled.div`
    position: absolute;
    inset: 0;
    clip-path: ellipse(92% 80% at 100% 50%);

    img {
        object-fit: cover;
        /* Encuadre sobre el letrero de neón y la sala */
        object-position: 78% center;
    }

    /* Difuminado hacia el panel del formulario */
    &::after {
        content: "";
        position: absolute;
        inset: 0;
        background:
            linear-gradient(90deg, rgba(233, 221, 241, 1) 6%, rgba(233, 221, 241, 0.75) 18%, rgba(233, 221, 241, 0.3) 32%, rgba(233, 221, 241, 0) 50%),
            linear-gradient(0deg, rgba(74, 59, 87, 0.18) 0%, rgba(74, 59, 87, 0) 30%);
    }

    ${MOBILE} {
        clip-path: ellipse(100% 92% at 50% 0%);

        &::after {
            background: linear-gradient(0deg, rgba(250, 243, 239, 0.85) 0%, rgba(250, 243, 239, 0) 45%);
        }
    }
`;

export default function AuthShell({ title, subtitle, children }: IAuthShell) {
    return (
        <Page>
            <FormSide>
                <Brand className={playfair.className}>
                    <FaSpa size={26} />
                    Salón de Belleza
                </Brand>
                <div>
                    <Heading className={playfair.className}>{title}</Heading>
                    <Subtitle>{subtitle}</Subtitle>
                </div>
                <Card>{children}</Card>
            </FormSide>

            <HeroSide aria-hidden="true">
                <ImageFrame>
                    <Image src={heroImage} alt="" fill priority placeholder="blur" sizes="(max-width: 900px) 100vw, 60vw" />
                </ImageFrame>
            </HeroSide>
        </Page>
    );
}
