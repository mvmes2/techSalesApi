import { CustomerRepository } from "@app/repositories/customer/customer-repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { Customer } from "@app/entities/customer/customer";
import { PrismaCustomerMapper } from "../../mappers/customer/prisma-customer-mapper";
import { spTimeZoneDate } from "@helpers/dateSpTimezone";


@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
    constructor(private readonly prismaService: PrismaService){}

    async create(customer: Customer): Promise<void> {

        const rawCustomer = PrismaCustomerMapper.toPrisma(customer);
        await this.prismaService.customer.create({
            data: rawCustomer
        });
        return;
    }

    async findByEmailAndCompanyId(email: string, company_id: string): Promise<any> {
        const foundCustomer = await this.prismaService.customer.findUnique({ where: { unique_company_customer_email: { customer_email: email, company_id: company_id } }, include: { sales: { include: { payments: true } } } });
        if (!foundCustomer) {
            return null
        }
        return foundCustomer;
    }

    async findByCpf(cpf: string, company_id: string): Promise<any> {
        const foundCustomer = await this.prismaService.customer.findUnique({ where: { unique_company_customer_cpf: { customer_cpf: cpf, company_id: company_id } }, include: { sales: { include: { payments: true } } } });
        if (!foundCustomer) {
            return null
        }
        return foundCustomer;
    }

    async findById(id: string): Promise<any> {
        const foundCustomer = await this.prismaService.customer.findUnique({ where: { id: id }, include: { sales: { include: { payments: true } } } });
        if (!foundCustomer) {
            return null
        }
        return foundCustomer;
    }

    async getAllCustomers(company_id: string): Promise<any[]> {
        const foundCustomers = await this.prismaService.customer.findMany({ where: { company_id: company_id }, include: { sales: { include: { payments: true } } } });
        if (!foundCustomers) {
            return null
        }
        return foundCustomers;
    }

    async updateByField(customer_id: string, field: string, data: any): Promise<void> {
       await this.prismaService.customer.update({ where: { id: customer_id }, data: { [field]: data, updated_at: spTimeZoneDate(new Date()) } });
        return;
    }
}