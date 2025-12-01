import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepository } from "@app/repositories/user/user-repository";
import { PrismaUserRepository } from "./prisma/repositories/user/prisma-user-repository";
import { CompanyRepository } from "@app/repositories/company/company-repository";
import { PrismaCompanyRepository } from "./prisma/repositories/company/prisma-company-repository";
import { SessionRepository } from "@app/repositories/session/session-repository";
import { PrismaSessionRepository } from "./prisma/repositories/session/prisma-session-repository";
import { CustomerRepository } from "@app/repositories/customer/customer-repository";
import { PrismaCustomerRepository } from "./prisma/repositories/customer/prisma-customer-repository";
import { Productrepository } from "@app/repositories/product/product-repository";
import { PrismaProductRepository } from "./prisma/repositories/product/prisma-product-repository";


@Module({
    imports: [],
    providers: [
        PrismaService,
    {
        provide: UserRepository,
        useClass: PrismaUserRepository
    },
    {
        provide: CompanyRepository,
        useClass: PrismaCompanyRepository
    },
    {
        provide: SessionRepository,
        useClass: PrismaSessionRepository
    },
    {
        provide: CustomerRepository,
        useClass: PrismaCustomerRepository
    },
    {
        provide: Productrepository,
        useClass: PrismaProductRepository
    }
],
exports: [
    PrismaService,
    UserRepository,
    CompanyRepository,
    SessionRepository,
    CustomerRepository,
    Productrepository
]
})
export class DatabaseModule {}