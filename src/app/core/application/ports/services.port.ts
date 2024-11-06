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
     * register a service
     * @param {IRegisterServiceRequest} - Register Request
     * @returns {Promise<IRegisterServiceResponse>} - Register Response
     */

    registerService(service: IRegisterServiceRequest): Promise<IRegisterServiceResponse>
}