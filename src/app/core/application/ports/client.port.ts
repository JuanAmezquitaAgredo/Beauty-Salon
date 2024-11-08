export interface PClient{

    /**
     * Get all clients
     * @param {IClientsRequest} - Client Request
     * @param {Promise<IClientsResponse>} - Client Response
     */
    
    getAllClients(req: IClientsRequest): Promise<IClientsResponse>

    /**
     * Delete a client
     * @param {number} - Delete Request
     */



    /**
     * Get a client by ID
     * @param {number} - Client ID
     * @returns {Promise<IClient>} - Client
     */

    getClient(id: number): Promise<IClientsResponse>

    /**
     * Update a client
     * @param {number} - Client ID
     * @param {IClient} - Client
     * @returns {Promise<IClient>} - Updated Client
     */

    updateClient(id: number, client: IRegiterClientRequest): Promise<IRegisterClientResponse>
    
    /**
     * Register a client
     * @param {IClient} - Client
     * @returns {Promise<IClient>} - Registered Client
     */
    
    registerClient(client: IRegiterClientRequest): Promise<IRegisterClientResponse>
}