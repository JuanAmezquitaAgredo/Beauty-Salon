interface IEditClientResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    appointments: Appointment[];
}