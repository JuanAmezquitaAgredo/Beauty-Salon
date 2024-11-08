export interface PClient{

    /**
     * Get all clients
     * @param {IClientsRequest} - Client Request
     * @param {Promise<IClientsResponse>} - Client Response
     */
    
    getAllClients(req: IClientsRequest): Promise<IClientsResponse>
}