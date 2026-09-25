import { IAppointmentRequest } from "@/app/core/application/dto/appointments/appointment-request.dto";
import { AppointmentService } from "@/app/infrastucture/services/appointment.service";
import { handleApiError } from "@/app/infrastucture/utils/api-response";
import { NextResponse } from "next/server";

const service = new AppointmentService();

// POST
export async function POST(req: Request) {
    try {
        const body: IAppointmentRequest = await req.json();
        const created = await service.registerAppointment(body);

        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        return handleApiError(error);
    }
}
