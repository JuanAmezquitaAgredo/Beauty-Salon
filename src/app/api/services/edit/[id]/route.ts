import { ServicesService } from "@/app/infrastucture/services/services.services";
import { NextResponse } from "next/server";


// EDIT
export async function PUT(request: Request,
    { params }: { params: Promise<{ id: number }> }) {
    try {
        const body: IEditServiceRequest = await request.json();
        const useRegisterService = new ServicesService();
        const id = (await params).id
        const editService = await useRegisterService.updateService(id, body);

        return NextResponse.json(editService, { status: 200 });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
    }
}