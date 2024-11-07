import { IRegisterServiceRequest } from "@/app/core/application/dto/services/register-request.dto";
import { HttpClient } from "../utils/client-http";
import { PServices } from "@/app/core/application/ports/services.port";
import { IRegisterServiceResponse } from "@/app/core/application/dto/services/register-response.dto";
import { IEditServiceResponse } from "@/app/core/application/dto/services/edit-response.dto";

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

    async getService(id: number): Promise<IServicesResponse> {
      try {
        const service = await this.clientHttp.get<IServicesResponse>(`services/${id}`);
        return service;
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

    async deleteService(id: number){
      try {
        const deleteService = this.clientHttp.delete(`services/${id}`);
        return deleteService;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    async updateService(id: number, service: IEditServiceRequest): Promise<IEditServiceResponse>{
      try {
        const updateService = await this.clientHttp.put<IEditServiceResponse, IEditServiceRequest>(`services/${id}`, service)
        return updateService;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
} 