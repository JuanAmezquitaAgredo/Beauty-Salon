import { IRegisterEmployRequest } from "../dto/employed/register-request.dto"
import { IRegisterEmployResponse } from "../dto/employed/register-response.dto"

export interface PEmploye{

    /**
     * Get all employees
     * @param {IEmployRequest} - Employee Request
     * @param {Promise<IEmployResponse>} - Employee Response
     */

    getAllEmployees(req: IEmployRequest): Promise<IEmployResponse>

    /**
     * Register an employee
     * @param {IRegisterEmployeeRequest} - Register Request
     * @returns {Promise<IRegisterEmployeeResponse>} - Register Response
     */

    registerEmployee(employee: IRegisterEmployRequest): Promise<IRegisterEmployResponse>
    
    /**
     * Delete an employee
     * @param {number} - Delete Request
     */
    
    deleteEmployee(id: number): Promise<void>

    /**
     * Update an employee
     * @param {number} - Employee ID
     * @param {IEditEmployeeRequest} - Edit Request
     * @returns {Promise<IEditEmployeeResponse>} - Edit Response
     */
    
    updateEmployee(id: number, employee: IEditEmployeRequest): Promise<IEditEmployeResponse>

    /**
     * Get a single employee by ID
     * @param {number} - Employee ID
     * @returns {Promise<IEmployResponse>} - Employee Response
     */

    getEmployeeById(id: number): Promise<IEmployResponse>

}