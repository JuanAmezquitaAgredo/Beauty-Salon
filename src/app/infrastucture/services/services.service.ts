import { IRegisterServiceRequest } from "@/app/core/application/dto/services/register-request.dto";
import { PServices } from "@/app/core/application/ports/services.port";
import { IRegisterServiceResponse } from "@/app/core/application/dto/services/register-response.dto";
import { IEditServiceResponse } from "@/app/core/application/dto/services/edit-response.dto";
import { prisma } from "../db/prisma";
import { HttpError } from "../utils/api-response";
import { normalizePage, toPage } from "../utils/pagination";
import { serviceSchema, validate } from "../validation/schemas";

const serviceSelect = { id: true, name: true, description: true, price: true };

export class ServicesService implements PServices{

    async getAllServices({size, page}: IServicesRequest): Promise<IServicesResponse> {
        const p = normalizePage(page, size);
        const [content, total] = await prisma.$transaction([
            prisma.service.findMany({ select: serviceSelect, orderBy: { id: "asc" }, skip: p.skip, take: p.size }),
            prisma.service.count(),
        ]);
        return toPage(content, p.page, p.size, total);
    }

    async getService(id: number): Promise<Service> {
        return prisma.service.findUniqueOrThrow({ where: { id }, select: serviceSelect });
    }

    async registerService(service: IRegisterServiceRequest): Promise<IRegisterServiceResponse>{
        const data = await validate(serviceSchema, service);
        return prisma.service.create({ data, select: serviceSelect });
    }

    async deleteService(id: number){
        const appointments = await prisma.appointment.count({ where: { serviceId: id } });
        if (appointments > 0) {
            throw new HttpError(409, `No se puede eliminar: el servicio tiene ${appointments} cita(s) asociada(s)`);
        }
        await prisma.service.delete({ where: { id } });
    }

    async updateService(id: number, service: IEditServiceRequest): Promise<IEditServiceResponse>{
        const data = await validate(serviceSchema, service);
        return prisma.service.update({ where: { id }, data, select: serviceSelect });
    }
}
