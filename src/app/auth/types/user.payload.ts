import { CompanyProps } from "@app/entities/company/company";
import { Email } from "@app/entities/user/validations/user.email.validation";

export interface UserPayload {
    id: string;
    email: Email;
    name: string;
    company_id: string;
    company_name: string;
    company_cnpj: string;
    user_level: number;
    iat?: number;
    exp?: number;
}