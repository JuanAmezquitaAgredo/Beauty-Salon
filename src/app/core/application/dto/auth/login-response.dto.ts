export interface ILoginResponse {
    message: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}
