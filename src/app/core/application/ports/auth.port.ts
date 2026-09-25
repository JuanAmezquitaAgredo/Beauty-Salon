import { ILoginRequest } from "../dto/auth/login-request.dto";
import { ILoginResponse } from "../dto/auth/login-response.dto";
import { IRegisterUserRequest } from "../dto/users/register-user-request.dto";
import { IRegisterUserResponse } from "../dto/users/register-user-response.dto";

export interface PAuth{
    /**
     * Login user
     * @param {ILoginRequest} - Login request
     * @returns {Promise<ILoginResponse>}Login response
     */
    
    login(req: ILoginRequest): Promise<ILoginResponse>

    /**
     * Register a new user
     * @param {IRegisterUserRequest} - Register request
     * @returns {Promise<IRegisterUserResponse>} - Registered user (without password)
     */

    register(req: IRegisterUserRequest): Promise<IRegisterUserResponse>
}
