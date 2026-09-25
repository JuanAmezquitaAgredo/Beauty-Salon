import { AppointmentService } from "@/app/infrastucture/services/appointment.service";
import { handleApiError, parseId } from "@/app/infrastucture/utils/api-response";
import { NextResponse } from "next/server";

const service = new AppointmentService();

// GET
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const data = await service.getAppointment(parseId(params.id));

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}
