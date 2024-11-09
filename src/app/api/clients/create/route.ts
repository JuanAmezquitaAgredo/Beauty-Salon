import { ClientService } from "@/app/infrastucture/services/client.service";
import { NextResponse } from "next/server";

const useRegisterClient = new ClientService();

// POST
export async function POST(req: Request) {
    try {
        const body: IRegiterClientRequest = await req.json();
        const newService = await useRegisterClient.registerClient(body);
        
        return NextResponse.json(newService, { status: 200 });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
    }
}