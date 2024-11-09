import { ClientService } from "@/app/infrastucture/services/client.service";
import { ServicesService } from "@/app/infrastucture/services/services.service";
import { NextResponse } from "next/server";


// DELETE
export async function DELETE(request: Request,
    { params }: { params: Promise<{ id: number }> }) {
    try {
        const useRegisterService = new ClientService();
        const id = (await params).id
         await useRegisterService.deleteClient(id);

        return NextResponse.json({message: 'Eliminado correctamente'}, { status: 200 });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
    }
}