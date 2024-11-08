import { PClient } from "@/app/core/application/ports/client.port";
import { HttpClient } from "../utils/client-http";

export class ClientService implements PClient{
    private clientHttp: HttpClient;

    constructor(){
        this.clientHttp = new HttpClient();
    }

    async getAllClients({size, page}: IClientsRequest): Promise<IClientsResponse> {
        try {
            const response = this.clientHttp.get<IClientsResponse>(`clients?page=${page}&size=${size}`);
            return response;
          } catch (error) {
            console.log(error);
            throw error;
          }
    }

    async getClient(id: number): Promise<IClientsResponse> {
        try {
            const response = this.clientHttp.get<IClientsResponse>(`clients/${id}`);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async registerClient(client: IRegiterClientRequest): Promise<IRegisterClientResponse> {
        try {
            const response = this.clientHttp.post<IRegisterClientResponse, IRegiterClientRequest>(`clients`, client);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateClient(id: number, client: IRegiterClientRequest): Promise<IRegisterClientResponse>{
        try {
            const response = this.clientHttp.put<IRegisterClientResponse, IRegiterClientRequest>(`clients/${id}`, client);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}