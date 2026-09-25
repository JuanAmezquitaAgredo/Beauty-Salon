import { IAppointmentRequest } from "@/app/core/application/dto/appointments/appointment-request.dto";
import { AppointmentService } from "@/app/infrastucture/services/appointment.service";
import { handleApiError, parseId } from "@/app/infrastucture/utils/api-response";
import { NextResponse } from "next/server";

const service = new AppointmentService();

// EDIT
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body: IAppointmentRequest = await request.json();
        const updated = await service.updateAppointment(parseId(params.id), body);

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}
