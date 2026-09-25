import { ClientService } from "@/app/infrastucture/services/client.service";
import { handleApiError } from "@/app/infrastucture/utils/api-response";
import { NextResponse } from "next/server";

const service = new ClientService();

// POST
export async function POST(req: Request) {
    try {
        const body: IRegiterClientRequest = await req.json();
        const created = await service.registerClient(body);

        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        return handleApiError(error);
    }
}
