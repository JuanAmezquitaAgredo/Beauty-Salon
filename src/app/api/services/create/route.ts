import { IRegisterServiceRequest } from "@/app/core/application/dto/services/register-request.dto";
import { ServicesService } from "@/app/infrastucture/services/services.service";
import { handleApiError } from "@/app/infrastucture/utils/api-response";
import { NextResponse } from "next/server";

const service = new ServicesService();

// POST
export async function POST(req: Request) {
    try {
        const body: IRegisterServiceRequest = await req.json();
        const created = await service.registerService(body);

        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        return handleApiError(error);
    }
}
