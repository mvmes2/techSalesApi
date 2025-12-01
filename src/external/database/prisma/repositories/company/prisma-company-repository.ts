import { UserRepository } from "@app/repositories/user/user-repository";
import { PrismaService } from "../../prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaUserMapper } from "../../mappers/user/prisma-user-mapper";
import { CompanyRepository } from "@app/repositories/company/company-repository";
import { PrismaCompanyMapper } from "../../mappers/company/prisma-company-mapper";
import { Company } from "@app/entities/company/company";

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
    constructor(private prismaService: PrismaService) {}
    async findById(id: string): Promise<Company> {
        const foundCompany = await this.prismaService.company.findUnique({ where: { id }, include: { users: true, sessions: true } });
        if (!foundCompany) {
            return null
        }
        return PrismaCompanyMapper.toDomain(foundCompany);
    }
    
    async findByCnpj(companyCnpj: string): Promise<Company | null> {
        const foundCompany = await this.prismaService.company.findUnique({ where: { cnpj: companyCnpj }, include: { users: true, sessions: true } });
        if (!foundCompany) {
            return null
        }
        return PrismaCompanyMapper.toDomain(foundCompany);
    }
    async create(company: Company): Promise<void> {
        const rawCompany = PrismaCompanyMapper.toPrisma(company);
        await this.prismaService.company.create({
            data: rawCompany
        });
        return;
    }
}