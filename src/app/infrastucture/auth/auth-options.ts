import { ILoginRequest } from "@/app/core/application/dto/auth/login-request.dto";
import { AuthService } from "@/app/infrastucture/services/auth.service";
import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface AuthToken {
    id?: string;
}

interface CustomSession extends Session {
    user: {
        id?: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Correo Electrónico", type: "text" },
                password: { label: "Contraseña", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.password || !credentials?.username) {
                    console.error("Credenciales inválidas");
                    return null;
                }

                const loginRequest: ILoginRequest = {
                    userName: credentials.username,
                    password: credentials.password,
                }

                try {
                    const authService = new AuthService();
                    const response = await authService.login(loginRequest);
                    return response.user;
                } catch (error) {
                    console.log(error)
                    return Promise.reject(new Error(JSON.stringify(error)))
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            const customSession = session as CustomSession;
            customSession.user.id = (token as AuthToken).id;
            return customSession;
        },
    },
};
