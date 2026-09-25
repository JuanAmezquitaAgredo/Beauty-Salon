import { ServicesService } from "@/app/infrastucture/services/services.service";
import { handleApiError, parseId } from "@/app/infrastucture/utils/api-response";
import { NextResponse } from "next/server";

const service = new ServicesService();

// DELETE
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await service.deleteService(parseId(params.id));

        return NextResponse.json({ message: "Eliminado correctamente" }, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}
