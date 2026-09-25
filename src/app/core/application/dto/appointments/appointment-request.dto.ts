export interface IAppointmentRequest {
    dateTime: string;
    duration: number;
    comments: string;
    clientId: number;
    serviceId: number;
    employeeId: number;
}
