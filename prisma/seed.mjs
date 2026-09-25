// Datos iniciales. Uso: npm run db:seed
// Crea/actualiza el usuario administrador (ADMIN_EMAIL / ADMIN_PASSWORD) y, si la BD está vacía,
// carga servicios, clientes, empleados y citas de ejemplo. Es seguro ejecutarlo varias veces.
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedAdmin() {
    const email = (process.env.ADMIN_EMAIL || "jagredo03@gmail.com").trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!password || password.length < 8) {
        console.warn("ADMIN_PASSWORD no definida (mínimo 8 caracteres): se omite el usuario administrador.");
        return;
    }

    await prisma.user.upsert({
        where: { email },
        update: { password: await bcrypt.hash(password, 10), role: "ADMIN" },
        create: {
            email,
            password: await bcrypt.hash(password, 10),
            firstName: "Admin",
            lastName: "Salón",
            role: "ADMIN",
        },
    });
    console.log(`Usuario administrador listo: ${email}`);
}

async function seedSampleData() {
    if ((await prisma.service.count()) > 0) {
        console.log("La BD ya tiene datos, se omiten los datos de ejemplo.");
        return;
    }

    const services = await Promise.all([
        { name: "Corte de cabello", description: "Corte y peinado para dama o caballero", price: 35000 },
        { name: "Manicure", description: "Manicure tradicional con esmaltado", price: 25000 },
        { name: "Pedicure", description: "Pedicure spa con exfoliación", price: 30000 },
        { name: "Tinte", description: "Coloración completa del cabello", price: 90000 },
        { name: "Keratina", description: "Tratamiento alisador con keratina", price: 150000 },
        { name: "Maquillaje social", description: "Maquillaje para eventos", price: 80000 },
    ].map((data) => prisma.service.create({ data })));

    const clients = await Promise.all([
        { firstName: "Laura", lastName: "Gómez", email: "laura.gomez@example.com", phone: "3001234567" },
        { firstName: "Camila", lastName: "Rodríguez", email: "camila.rodriguez@example.com", phone: "3012345678" },
        { firstName: "Andrés", lastName: "Martínez", email: "andres.martinez@example.com", phone: "3023456789" },
        { firstName: "Valentina", lastName: "López", email: "valentina.lopez@example.com", phone: "3034567890" },
    ].map((data) => prisma.client.create({ data })));

    const employees = await Promise.all([
        { firstName: "Sofía", lastName: "Ramírez", email: "sofia.ramirez@beautysalon.com", phone: "3105550001", role: "STYLIST" },
        { firstName: "Daniela", lastName: "Torres", email: "daniela.torres@beautysalon.com", phone: "3105550002", role: "STYLIST" },
        { firstName: "Mariana", lastName: "Castro", email: "mariana.castro@beautysalon.com", phone: "3105550003", role: "RECEPTIONIST" },
    ].map((data) => prisma.employee.create({ data })));

    // Citas en los próximos días a partir de hoy
    const at = (days, hour) => {
        const d = new Date();
        d.setUTCDate(d.getUTCDate() + days);
        d.setUTCHours(hour + 5, 0, 0, 0); // hora de Colombia (UTC-5)
        return d;
    };

    await prisma.appointment.createMany({
        data: [
            { dateTime: at(1, 9), duration: 45, comments: "Primera visita", clientId: clients[0].id, serviceId: services[0].id, employeeId: employees[0].id },
            { dateTime: at(1, 11), duration: 60, comments: "", clientId: clients[1].id, serviceId: services[1].id, employeeId: employees[1].id },
            { dateTime: at(2, 15), duration: 120, comments: "Tono castaño claro", clientId: clients[3].id, serviceId: services[3].id, employeeId: employees[0].id },
        ],
    });

    console.log("Datos de ejemplo creados.");
}

try {
    await seedAdmin();
    await seedSampleData();
} catch (error) {
    console.error(error);
    process.exitCode = 1;
} finally {
    await prisma.$disconnect();
}
