import { ILoginRequest } from "@/app/core/application/dto/auth/login-request.dto";
import { ILoginResponse } from "@/app/core/application/dto/auth/login-response.dto";
import { IRegisterUserRequest } from "@/app/core/application/dto/users/register-user-request.dto";
import { IRegisterUserResponse } from "@/app/core/application/dto/users/register-user-response.dto";
import { ErrorResponse } from "@/app/core/application/dto/common/error-response.dto";
import { PAuth } from "@/app/core/application/ports/auth.port";
import bcrypt from "bcryptjs";
import { prisma } from "../db/prisma";
import { HttpError } from "../utils/api-response";
import { registerUserSchema, validate } from "../validation/schemas";

export class AuthService implements PAuth{

    async login(req: ILoginRequest): Promise<ILoginResponse>{
        const user = await prisma.user.findUnique({ where: { email: req.userName.trim().toLowerCase() } });
        const valid = user ? await bcrypt.compare(req.password, user.password) : false;

        if (!user || !valid) {
            // Mismo formato de error que devolvía el backend; LoginForm lo muestra en el campo email
            const error: ErrorResponse = { status: "error", code: 401, errors: [{ message: "Credenciales inválidas" }] };
            throw error;
        }

        return {
            message: "Login exitoso",
            user: { id: String(user.id), name: `${user.firstName} ${user.lastName}`, email: user.email },
        };
    }

    async register(req: IRegisterUserRequest): Promise<IRegisterUserResponse>{
        const data = await validate(registerUserSchema, req);

        const exists = await prisma.user.findUnique({ where: { email: data.email } });
        if (exists) {
            throw new HttpError(409, "Ya existe un usuario con ese email");
        }

        const password = await bcrypt.hash(data.password, 10);
        return prisma.user.create({
            data: { ...data, password },
            select: { id: true, firstName: true, lastName: true, email: true },
        });
    }
}
