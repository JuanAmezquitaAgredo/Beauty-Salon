import { IRegisterServiceRequest } from "@/app/core/application/dto/services/register-request.dto";
import { ServicesService } from "@/app/infrastucture/services/services.services";
import { NextResponse } from "next/server";

const useRegisterService = new ServicesService();

// POST
export async function POST(req: Request) {
    try {
        const body: IRegisterServiceRequest = await req.json();
        const newService = await useRegisterService.registerService(body);
        
        return NextResponse.json(newService, { status: 200 });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
    }
}