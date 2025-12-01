import { UserRepository } from "@app/repositories/user/user-repository";
import { User } from "@app/entities/user/user";
import { Email } from "@app/entities/user/validations/user.email.validation";
import { Injectable } from "@nestjs/common";
import { Company } from "@app/entities/company/company";
import { CompanyRepository } from "@app/repositories/company/company-repository";
import { CompanyAlreadyExists } from "./errors/company-cnpj-already-exists-error";
import { spTimeZoneDate } from "@helpers/dateSpTimezone";
import { UserEmailAlreadyInUse } from "../user/errors/user-email-already-in-use-error";
import * as bcrypt from 'bcrypt';

export interface CreateCompanyAndUserRequest {
    company: {
        company_name: string;
        cnpj: string;
        owner_name: string;
        owner_email: string;
    };
    user: {
        name: string;
        email: string;
        password: string;
        user_cpf: string;
    };
}

export interface CreateCompanyAndUserResponse {
    company: Company;
    user: User;
}

@Injectable()
export class CreateCompanyAndUser {
    constructor(private companyRepository: CompanyRepository,
                private userRepository: UserRepository
    ){}
    async execute(request: CreateCompanyAndUserRequest): Promise<CreateCompanyAndUserResponse> {

        const { company_name, owner_email, owner_name, cnpj } = request.company;
        const { name, email, password, user_cpf } = request.user;

        

        const companyFound = await this.companyRepository.findByCnpj(cnpj);
        
        const userFound = await this.userRepository.findByEmail(email);

        if (companyFound) {
            throw new CompanyAlreadyExists();
        } if (userFound) {
            throw new UserEmailAlreadyInUse();
        }else {
            const company = new Company({
                company_name,
                owner_email: new Email(owner_email),
                owner_name,
                cnpj
            });

            const user = new User({
                user_name: name,
                user_email: new Email(email),
                user_password: await bcrypt.hash(password, 11),
                user_cpf,
                company_id: company.id,
                user_level: 3,
                created_at: spTimeZoneDate(new Date())
            });
    
            await this.companyRepository.create(company);
            await this.userRepository.create(user);
    
            return {
                company,
                user
            }
        }       
    }
}