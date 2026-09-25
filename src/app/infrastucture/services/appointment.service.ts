import { PAppointment } from "@/app/core/application/ports/appointment.port";
import { IAppointmentRequest } from "@/app/core/application/dto/appointments/appointment-request.dto";
import { IAppointmentOptions, IAppointmentResponse } from "@/app/core/application/dto/appointments/appointment-response.dto";
import { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma";
import { HttpError } from "../utils/api-response";
import { IPage, normalizePage, toPage } from "../utils/pagination";
import { appointmentSchema, validate } from "../validation/schemas";

const appointmentInclude = {
    client: { select: { id: true, firstName: true, lastName: true } },
    service: { select: { id: true, name: true, description: true, price: true } },
    employee: { select: { id: true, firstName: true, lastName: true } },
} satisfies Prisma.AppointmentInclude;

type AppointmentRow = Prisma.AppointmentGetPayload<{ include: typeof appointmentInclude }>;

const toResponse = (row: AppointmentRow): IAppointmentResponse => ({
    ...row,
    dateTime: row.dateTime.toISOString(),
});

// Al crear/editar, una FK inválida significa que el cliente, servicio o empleado no existe
const withReferenceCheck = async <T>(operation: Promise<T>): Promise<T> => {
    try {
        return await operation;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003") {
            throw new HttpError(400, "El cliente, servicio o empleado seleccionado no existe");
        }
        throw error;
    }
};

export class AppointmentService implements PAppointment{

    async getAllAppointments({size, page}: { page: number; size: number }): Promise<IPage<IAppointmentResponse>> {
        const p = normalizePage(page, size);
        const [rows, total] = await prisma.$transaction([
            prisma.appointment.findMany({ include: appointmentInclude, orderBy: { dateTime: "asc" }, skip: p.skip, take: p.size }),
            prisma.appointment.count(),
        ]);
        return toPage(rows.map(toResponse), p.page, p.size, total);
    }

    async getAppointment(id: number): Promise<IAppointmentResponse> {
        const row = await prisma.appointment.findUniqueOrThrow({ where: { id }, include: appointmentInclude });
        return toResponse(row);
    }

    async registerAppointment(appointment: IAppointmentRequest): Promise<IAppointmentResponse> {
        const data = await validate(appointmentSchema, appointment);
        const row = await withReferenceCheck(prisma.appointment.create({ data, include: appointmentInclude }));
        return toResponse(row);
    }

    async updateAppointment(id: number, appointment: IAppointmentRequest): Promise<IAppointmentResponse> {
        const data = await validate(appointmentSchema, appointment);
        const row = await withReferenceCheck(prisma.appointment.update({ where: { id }, data, include: appointmentInclude }));
        return toResponse(row);
    }

    async deleteAppointment(id: number){
        await prisma.appointment.delete({ where: { id } });
    }

    async getOptions(): Promise<IAppointmentOptions> {
        const [clients, services, employees] = await prisma.$transaction([
            prisma.client.findMany({ orderBy: { firstName: "asc" } }),
            prisma.service.findMany({ orderBy: { name: "asc" } }),
            prisma.employee.findMany({ orderBy: { firstName: "asc" } }),
        ]);
        return {
            clients: clients.map((c) => ({ value: String(c.id), label: `${c.firstName} ${c.lastName}` })),
            services: services.map((s) => ({ value: String(s.id), label: s.name })),
            employees: employees.map((e) => ({ value: String(e.id), label: `${e.firstName} ${e.lastName}` })),
        };
    }
}
