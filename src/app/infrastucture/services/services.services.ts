import { IRegisterServiceRequest } from "@/app/core/application/dto/services/register-request.dto";
import { HttpClient } from "../utils/client-http";
import { PServices } from "@/app/core/application/ports/services.port";
import { IRegisterServiceResponse } from "@/app/core/application/dto/services/register-response.dto";

export class ServicesService implements PServices{
    private clientHttp: HttpClient;

    constructor(){
        this.clientHttp = new HttpClient();
    }

    async getAllServices({size, page}: IServicesRequest): Promise<IServicesResponse> {
        try {
            const response = this.clientHttp.get<IServicesResponse>(`services?page=${page}&size=${size}`);
            return response;
          } catch (error) {
            console.log(error);
            throw error;
          }
    }

    async registerService(service: IRegisterServiceRequest): Promise<IRegisterServiceResponse>{
        try {
            const registerService = await this.clientHttp.post<IRegisterServiceResponse, IRegisterServiceRequest>('services', service)
            return registerService;
          } catch (error) {
            console.log(error);
            throw error;
          }
    }

}