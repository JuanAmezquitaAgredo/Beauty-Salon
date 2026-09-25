import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { ValidationError } from "yup";

// Error de negocio con código HTTP, se traduce a la respuesta estándar { status, code, errors }
export class HttpError extends Error {
    constructor(public code: number, message: string) {
        super(message);
    }
}

export function parseId(value: string): number {
    const id = Number(value);
    if (!Number.isInteger(id) || id <= 0) {
        throw new HttpError(400, "Id inválido");
    }
    return id;
}

function errorBody(code: number, errors: { message: string }[] | { field: string; error: string }[]) {
    return NextResponse.json({ status: "error", code, errors }, { status: code });
}

export function handleApiError(error: unknown) {
    if (error instanceof ValidationError) {
        return errorBody(400, error.inner.length
            ? error.inner.map((e) => ({ field: e.path ?? "", error: e.message }))
            : [{ field: error.path ?? "", error: error.message }]);
    }

    if (error instanceof HttpError) {
        return errorBody(error.code, [{ message: error.message }]);
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2025":
                return errorBody(404, [{ message: "Registro no encontrado" }]);
            case "P2002":
                return errorBody(409, [{ message: "Ya existe un registro con ese email" }]);
            case "P2003":
                return errorBody(409, [{ message: "La operación entra en conflicto con registros relacionados" }]);
        }
    }

    console.error("Error en el servidor:", error);
    return errorBody(500, [{ message: "Error al procesar la solicitud" }]);
}
