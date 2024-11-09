import { ClientService } from "@/app/infrastucture/services/client.service";
import { NextResponse } from "next/server";

// GET
export async function GET(request: Request, { params }: { params: Promise<{ id: number }> }) {
    try {
        const serviceService = new ClientService();
        const id = (await params).id;
        
        const serviceData = await serviceService.getClient(id);

        return NextResponse.json(serviceData, { status: 200 });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
    }
}
