import * as yup from "yup";

const requiredText = (label: string) => yup.string().trim().required(`${label} requerido`);

export const serviceSchema = yup.object({
    name: requiredText("Nombre"),
    description: requiredText("Descripción"),
    price: yup.number().typeError("El precio debe ser un número").min(0, "El precio no puede ser negativo").required("Precio requerido"),
});

export const clientSchema = yup.object({
    firstName: requiredText("Nombre"),
    lastName: requiredText("Apellido"),
    email: yup.string().trim().lowercase().email("Email inválido").required("Email requerido"),
    phone: yup.string().trim().required("Teléfono requerido"),
});

export const employeeSchema = clientSchema.shape({
    role: yup.string().trim().oneOf(["ADMIN", "STYLIST", "RECEPTIONIST"], "Rol inválido").required("Rol requerido"),
});

export const appointmentSchema = yup.object({
    dateTime: yup.date().typeError("Fecha inválida").required("Fecha requerida"),
    duration: yup.number().typeError("La duración debe ser un número").integer().min(1, "Duración mínima 1 minuto").required("Duración requerida"),
    comments: yup.string().trim().default(""),
    clientId: yup.number().typeError("Cliente requerido").integer().positive().required("Cliente requerido"),
    serviceId: yup.number().typeError("Servicio requerido").integer().positive().required("Servicio requerido"),
    employeeId: yup.number().typeError("Empleado requerido").integer().positive().required("Empleado requerido"),
});

export const registerUserSchema = yup.object({
    firstName: requiredText("Nombre"),
    lastName: requiredText("Apellido"),
    email: yup.string().trim().lowercase().email("Email inválido").required("Email requerido"),
    phone: yup.string().trim().default(""),
    password: yup.string().min(8, "La contraseña debe tener al menos 8 caracteres").required("Contraseña requerida"),
});

// Valida y normaliza el body; stripUnknown evita que se cuelen campos como `id`
export function validate<T extends yup.AnyObjectSchema>(schema: T, body: unknown): Promise<yup.InferType<T>> {
    return schema.validate(body, { abortEarly: false, stripUnknown: true });
}
