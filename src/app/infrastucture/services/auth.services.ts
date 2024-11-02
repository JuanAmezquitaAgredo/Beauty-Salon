import { ILoginRequest } from "@/app/core/application/dto/auth/login-request.dto";
import { ILoginResponse } from "@/app/core/application/dto/auth/login-response.dto";
import { PAuth } from "@/app/core/application/ports/auth.port";
import { HttpClient } from "../utils/client-http";

export class AuthService implements PAuth{
    private clientHttp: HttpClient;
    private basePath: string = "auth";

    constructor(){
        this.clientHttp = new HttpClient();
    }

    async login(req: ILoginRequest): Promise<ILoginResponse>{

        return this.clientHttp.post<ILoginResponse,ILoginRequest>(
            `${this.basePath}/login`,
            req
        );
    }

    async getAllServices(token: string): Promise<IServicesResponse> {
        try {
            const response = this.clientHttp.get<IServicesResponse>(`services?page=1&size=5`,token);
            return response;
          } catch (error) {
            console.log(error);
            throw error;
          }
    }

}