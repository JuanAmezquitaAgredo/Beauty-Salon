import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Protege el dashboard y la API de datos: sin sesión, la API responde 401 y las páginas redirigen a /login
export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (token) return NextResponse.next();

    if (req.nextUrl.pathname.startsWith("/api/")) {
        return NextResponse.json(
            { status: "error", code: 401, errors: [{ message: "No autorizado" }] },
            { status: 401 }
        );
    }

    return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/api/services/:path*",
        "/api/clients/:path*",
        "/api/employees/:path*",
        "/api/appointments/:path*",
    ],
};
