import { ILoginRequest } from "../dto/auth/login-request.dto";
import { ILoginResponse } from "../dto/auth/login-response.dto";

export interface PAuth{
    /**
     * Login user
     * @param {ILoginRequest} - Login request
     * @returns {Promise<ILoginResponse>}Login response
     */
    
    login(req: ILoginRequest): Promise<ILoginResponse>
}