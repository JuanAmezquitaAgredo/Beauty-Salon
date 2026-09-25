import { PClient } from "@/app/core/application/ports/client.port";
import { prisma } from "../db/prisma";
import { normalizePage, toPage } from "../utils/pagination";
import { clientSchema, validate } from "../validation/schemas";

const clientSelect = { id: true, firstName: true, lastName: true, email: true, phone: true };

export class ClientService implements PClient{

    async getAllClients({size, page}: IClientsRequest): Promise<IClientsResponse> {
        const p = normalizePage(page, size);
        const [content, total] = await prisma.$transaction([
            prisma.client.findMany({ select: clientSelect, orderBy: { id: "asc" }, skip: p.skip, take: p.size }),
            prisma.client.count(),
        ]);
        return toPage(content, p.page, p.size, total);
    }

    async getClient(id: number): Promise<Client> {
        return prisma.client.findUniqueOrThrow({ where: { id }, select: clientSelect });
    }

    async registerClient(client: IRegiterClientRequest): Promise<IRegisterClientResponse> {
        const data = await validate(clientSchema, client);
        return prisma.client.create({ data, select: clientSelect });
    }

    async updateClient(id: number, client: IEditClientRequest): Promise<IEditClientResponse>{
        const data = await validate(clientSchema, client);
        return prisma.client.update({ where: { id }, data, select: clientSelect });
    }

    async deleteClient(id: number){
        // Las citas del cliente se eliminan en cascada (ver prisma/schema.prisma)
        await prisma.client.delete({ where: { id } });
    }

}
