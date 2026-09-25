import { ClientService } from "@/app/infrastucture/services/client.service";
import { handleApiError, parseId } from "@/app/infrastucture/utils/api-response";
import { NextResponse } from "next/server";

const service = new ClientService();

// GET
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const data = await service.getClient(parseId(params.id));

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}
