import { string } from "yup";

export interface ErrorResponse {
    status: string;
    code: number;
    errors: FieldError[] | { message: string; }[];
    
}

export interface FieldError {
    field: string;
    error: string;
}