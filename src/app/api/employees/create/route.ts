import { IRegisterEmployRequest } from "@/app/core/application/dto/employed/register-request.dto";
import { EmployeeService } from "@/app/infrastucture/services/employee.service";
import { handleApiError } from "@/app/infrastucture/utils/api-response";
import { NextResponse } from "next/server";

const service = new EmployeeService();

// POST
export async function POST(req: Request) {
    try {
        const body: IRegisterEmployRequest = await req.json();
        const created = await service.registerEmployee(body);

        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        return handleApiError(error);
    }
}
