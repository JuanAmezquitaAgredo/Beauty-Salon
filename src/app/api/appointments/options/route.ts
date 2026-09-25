import { AppointmentService } from "@/app/infrastucture/services/appointment.service";
import { handleApiError } from "@/app/infrastucture/utils/api-response";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const service = new AppointmentService();

// GET: clientes, servicios y empleados para los selects del formulario de citas
export async function GET() {
    try {
        return NextResponse.json(await service.getOptions(), { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}
