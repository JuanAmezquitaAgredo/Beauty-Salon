import { PEmploye } from "@/app/core/application/ports/employ.port";
import { IRegisterEmployRequest } from "@/app/core/application/dto/employed/register-request.dto";
import { IRegisterEmployResponse } from "@/app/core/application/dto/employed/register-response.dto";
import { prisma } from "../db/prisma";
import { HttpError } from "../utils/api-response";
import { normalizePage, toPage } from "../utils/pagination";
import { employeeSchema, validate } from "../validation/schemas";

const employeeSelect = { id: true, firstName: true, lastName: true, email: true, phone: true, role: true };

export class EmployeeService implements PEmploye{

    async getAllEmployees({size, page}: IEmployRequest): Promise<IEmployResponse> {
        const p = normalizePage(page, size);
        const [content, total] = await prisma.$transaction([
            prisma.employee.findMany({ select: employeeSelect, orderBy: { id: "asc" }, skip: p.skip, take: p.size }),
            prisma.employee.count(),
        ]);
        return toPage(content, p.page, p.size, total);
    }

    async getEmployeeById(id: number): Promise<Employee> {
        return prisma.employee.findUniqueOrThrow({ where: { id }, select: employeeSelect });
    }

    async registerEmployee(employee: IRegisterEmployRequest): Promise<IRegisterEmployResponse> {
        const data = await validate(employeeSchema, employee);
        return prisma.employee.create({ data, select: employeeSelect });
    }

    async updateEmployee(id: number, employee: IEditEmployeRequest): Promise<IEditEmployeResponse> {
        const data = await validate(employeeSchema, employee);
        return prisma.employee.update({ where: { id }, data, select: employeeSelect });
    }

    async deleteEmployee(id: number){
        const appointments = await prisma.appointment.count({ where: { employeeId: id } });
        if (appointments > 0) {
            throw new HttpError(409, `No se puede eliminar: el empleado tiene ${appointments} cita(s) asociada(s)`);
        }
        await prisma.employee.delete({ where: { id } });
    }
}
