interface IRegisterClientResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    appointments?: Appointment[];
}