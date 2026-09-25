export interface IAppointmentResponse {
    id: number;
    dateTime: string;
    duration: number;
    comments: string;
    clientId: number;
    serviceId: number;
    employeeId: number;
    client: { id: number; firstName: string; lastName: string };
    service: { id: number; name: string; description: string; price: number };
    employee: { id: number; firstName: string; lastName: string };
}

export interface IAppointmentOptions {
    clients: { value: string; label: string }[];
    services: { value: string; label: string }[];
    employees: { value: string; label: string }[];
}
