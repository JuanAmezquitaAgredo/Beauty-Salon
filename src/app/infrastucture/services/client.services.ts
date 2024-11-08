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
}