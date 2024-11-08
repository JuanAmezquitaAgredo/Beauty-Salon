import { IEditServiceResponse } from "../dto/services/edit-response.dto"
import { IRegisterServiceRequest } from "../dto/services/register-request.dto"
import { IRegisterServiceResponse } from "../dto/services/register-response.dto"

export interface PServices{
    /**
     * Get All Services
     * @param {IServicesRequest} - Service request 
     * @returns {Promise<IServicesResponse>}Service response
     */
    
    getAllServices(req: IServicesRequest): Promise<IServicesResponse>

    /**
     * Get a single service by ID
     * @param {number} - Service ID
     * @returns {Promise<IServicesResponse>}Service response
     */
    getService(id: number): Promise<IServicesResponse>

    /**
     * register a service
     * @param {IRegisterServiceRequest} - Register Request
     * @returns {Promise<IRegisterServiceResponse>} - Register Response
     */

    registerService(service: IRegisterServiceRequest): Promise<IRegisterServiceResponse>

    /**
     * Delete a service
     * @param {number} - Delete Request
     */
    
    deleteService(id: number): Promise<void>

    /**
     * Update a service
     * @param {number} - Service ID
     * @param {IEditServiceRequest} - Edit Request
     * @returns {Promise<IEditServiceResponse>} - Edit Response
     */
    updateService(id: number, service: IEditServiceRequest): Promise<IEditServiceResponse>

}