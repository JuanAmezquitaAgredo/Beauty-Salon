import { IRegisterServiceRequest } from "@/app/core/application/dto/services/register-request.dto";
import { ServicesService } from "@/app/infrastucture/services/services.services";
import { NextResponse } from "next/server";

const useRegisterService = new ServicesService();

// POST
export async function POST(req: Request) {
    const body = await req.json() as IRegisterServiceRequest;
    const NewService = await useRegisterService.registerService(body);
    return NextResponse.json(NewService, { status: 200});
}