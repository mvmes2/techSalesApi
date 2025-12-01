import { User as DomainUser, UserProps } from "@app/entities/user/user";
import { Email } from "@app/entities/user/validations/user.email.validation";
import { Company, Session } from "@prisma/client";

export type RawUser = {
    id: string;
    user_name: string;
    user_email: string;
    user_password: string;
    user_cpf: string;
    user_level: number;
    company_id: string;
    created_at: Date;
    last_recover_pass_token?: string;
    updated_at?: Date | null;
    deleted_at?: Date | null;
    company?: Company;
    sessions?: Session[];
};

export class PrismaUserMapper {
    static toPrisma(user: DomainUser) {
       return {
            id: user.id,
            company_id: user.company_id,
            user_name: user.user_name,
            user_email: user.user_email.value,
            user_password: user.user_password,
            user_cpf: user.user_cpf,
            user_level: user.user_level,
            updated_at: user.updated_at,
            created_at: user.created_at
        };
    }

    static toAuth(user: DomainUser) {
        return {
             id: user.id,
             name: user.user_name,
             email: user.user_email.value, // Ajuste para acessar o valor do Email
         };
     }

    static toDomain(raw: RawUser): DomainUser {
        const company = raw.company
            ? {
                id: raw.company.id,
                company_name: raw.company.company_name,
                cnpj: raw.company.cnpj,
                owner_name: raw.company.owner_name,
                owner_email: new Email(raw.company.owner_email),
                product_key: raw.company.product_key,
                created_at: raw.company.created_at,
                deleted_at: raw.company.deleted_at,
                updated_at: raw.company.updated_at,
            }
            : undefined;

        const sessions = raw.sessions
            ? raw.sessions.map(session => ({
                id: session.id,
                company_id: session.company_id,
                user_id: session.user_id,
                token: session.token,
                ip_address: session.ip_address,
                location: session.location,
                browser: session.browser,
                created_at: session.created_at,
                updated_at: session.updated_at,
                deleted_at: session.deleted_at
            }))
            : undefined;

        return new DomainUser({
            user_email: new Email(raw.user_email),
            user_name: raw.user_name,
            user_password: raw.user_password,
            company_id: raw.company_id,
            user_cpf: raw.user_cpf,
            user_level: raw.user_level,
            created_at: raw.created_at,
            updated_at: raw.updated_at,
            deleted_at: raw.deleted_at,
            last_recover_pass_token: raw.last_recover_pass_token,
            company: company,
            sessions: sessions,
        }, raw.id);
    }
}
