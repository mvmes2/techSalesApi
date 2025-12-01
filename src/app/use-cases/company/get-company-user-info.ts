import { Company } from "@app/entities/company/company";
import { User } from "@app/entities/user/user";
import { CompanyRepository } from "@app/repositories/company/company-repository";
import { UserRepository } from "@app/repositories/user/user-repository";
import { generateNewJwtShadowed } from "@helpers/generateJwtShadowed";
import { Injectable } from "@nestjs/common";
import { CompanyOrUserNotExists } from "./errors/company-user-not-exists-error";


export interface getCompanyAndUserInfoRequest {
    companyId: string;
    userId: string;
}

export interface getCompanyAndUserInfoResponse {
    user: string;
    company: string;
}


export class UserViewModel {
    static toHTTP (user: User) {
        return {
            id: user.id,
            name: user.user_name,
            company_id: user.company_id,
            company: user.company,
            email: user.user_email.value,
            created_at: user.created_at,
            deleted_at: user.deleted_at,
            user_cpf: user.user_cpf,
            user_level: user.user_level,
            sessions: user.sessions,
        }
    }
}

@Injectable()
export class GetCompanyAndUserInfo {
    constructor(
        private companyRepository: CompanyRepository,
        private userRepository: UserRepository
    ) {}
    async execute(request: getCompanyAndUserInfoRequest): Promise<getCompanyAndUserInfoResponse> {
        const { companyId, userId } = request;
        
        const companyFound = await this.companyRepository.findById(companyId);
        const userFound = await this.userRepository.findById(userId);
        
        const userToSign = UserViewModel.toHTTP(userFound);

        if (!userFound || !companyFound) {
            throw new CompanyOrUserNotExists()
        } else {
            return {
                user: generateNewJwtShadowed({ userInfos: JSON.stringify(userToSign) }),
                company: generateNewJwtShadowed({ companyInfos: JSON.stringify(companyFound) })
            }
        }

    }
}