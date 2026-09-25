import { IRegisterEmployRequest } from "@/app/core/application/dto/employed/register-request.dto";
import { EmployeeService } from "@/app/infrastucture/services/employee.service";
import { handleApiError, parseId } from "@/app/infrastucture/utils/api-response";
import { NextResponse } from "next/server";

const service = new EmployeeService();

// EDIT
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body: IRegisterEmployRequest = await request.json();
        const updated = await service.updateEmployee(parseId(params.id), body);

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        return handleApiError(error);
    }
}
