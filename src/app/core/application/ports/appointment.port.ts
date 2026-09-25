import { IAppointmentRequest } from "../dto/appointments/appointment-request.dto"
import { IAppointmentOptions, IAppointmentResponse } from "../dto/appointments/appointment-response.dto"
import { IPage } from "@/app/infrastucture/utils/pagination"

export interface PAppointment{

    /**
     * Get all appointments (paginated)
     */
    getAllAppointments(req: { page: number; size: number }): Promise<IPage<IAppointmentResponse>>

    /**
     * Get a single appointment by ID
     */
    getAppointment(id: number): Promise<IAppointmentResponse>

    /**
     * Register an appointment
     */
    registerAppointment(appointment: IAppointmentRequest): Promise<IAppointmentResponse>

    /**
     * Update an appointment
     */
    updateAppointment(id: number, appointment: IAppointmentRequest): Promise<IAppointmentResponse>

    /**
     * Delete an appointment
     */
    deleteAppointment(id: number): Promise<void>

    /**
     * Clients, services and employees available to build the appointment form
     */
    getOptions(): Promise<IAppointmentOptions>
}
