import { ClientService } from "@/app/infrastucture/services/client.service";
import { handleApiError, parseId } from "@/app/infrastucture/utils/api-response";
import { NextResponse } from "next/server";

const service = new ClientService();

// EDIT
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body: IRegiterClientRequest = await request.json();
        const updated = await service.updateClient(parseId(params.id), body);

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}
