import { IRegisterServiceRequest } from "@/app/core/application/dto/services/register-request.dto";
import { ServicesService } from "@/app/infrastucture/services/services.service";
import { handleApiError, parseId } from "@/app/infrastucture/utils/api-response";
import { NextResponse } from "next/server";

const service = new ServicesService();

// EDIT
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body: IRegisterServiceRequest = await request.json();
        const updated = await service.updateService(parseId(params.id), body);

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}
