import { ServicesService } from "@/app/infrastucture/services/services.services";
import { NextResponse } from "next/server";

// GET
export async function GET(request: Request, { params }: { params: Promise<{ id: number }> }) {
    try {
        const serviceService = new ServicesService();
        const id = (await params).id;
        
        const serviceData = await serviceService.getService(id);

        return NextResponse.json(serviceData, { status: 200 });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
    }
}
