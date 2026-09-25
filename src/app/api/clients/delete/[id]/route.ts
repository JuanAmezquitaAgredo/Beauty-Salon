import { ClientService } from "@/app/infrastucture/services/client.service";
import { handleApiError, parseId } from "@/app/infrastucture/utils/api-response";
import { NextResponse } from "next/server";

const service = new ClientService();

// DELETE
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await service.deleteClient(parseId(params.id));

        return NextResponse.json({ message: "Eliminado correctamente" }, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}
