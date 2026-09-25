import { ErrorResponse } from "@/app/core/application/dto/common/error-response.dto";

// Extrae el primer mensaje legible de una respuesta de error de la API ({ status, code, errors })
export async function getApiErrorMessage(response: Response, fallback: string): Promise<string> {
    try {
        const body = (await response.json()) as ErrorResponse;
        const first = body.errors?.[0];
        if (first && "message" in first) return first.message;
        if (first && "error" in first) return first.error;
    } catch {
        // cuerpo vacío o no-JSON
    }
    return fallback;
}
