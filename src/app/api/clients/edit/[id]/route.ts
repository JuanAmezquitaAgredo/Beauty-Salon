import { ClientService } from "@/app/infrastucture/services/client.services";
import { NextResponse } from "next/server";


// EDIT
export async function PUT(request: Request,
    { params }: { params: Promise<{ id: number }> }) {
    try {
        const body: IEditClientRequest = await request.json();
        const useEditService = new ClientService();
        const id = (await params).id
        const editService = await useEditService.updateClient(id, body);

        return NextResponse.json(editService, { status: 200 });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
    }
}