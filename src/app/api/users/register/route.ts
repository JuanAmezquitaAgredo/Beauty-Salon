import { IRegisterUserRequest } from "@/app/core/application/dto/users/register-user-request.dto";
import { AuthService } from "@/app/infrastucture/services/auth.service";
import { handleApiError } from "@/app/infrastucture/utils/api-response";
import { NextResponse } from "next/server";

const service = new AuthService();

// POST (público): registro de usuarios del panel
export async function POST(req: Request) {
    try {
        const body: IRegisterUserRequest = await req.json();
        const user = await service.register(body);

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return handleApiError(error);
    }
}
