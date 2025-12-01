import { Customer } from "@app/entities/customer/customer";
import { CustomerRepository } from "@app/repositories/customer/customer-repository";
import { CustomerNotFoundWithEmail } from "./errors/customer-not-foundbyEmail-error";
import { Injectable } from "@nestjs/common";

export interface getOneCustomerRequest {
    email: string;
    company_id: string;
}

export interface getOneCustomerResponse {
    customer: Customer
}
@Injectable()
export class GetOneCustomer {
    constructor(private readonly customerRepository: CustomerRepository) {}
    async execute(request: getOneCustomerRequest): Promise<getOneCustomerResponse> {
        const { email, company_id } = request;
        const foundCustomer = await this.customerRepository.findByEmailAndCompanyId(email, company_id);

        if (!foundCustomer) {
            throw new CustomerNotFoundWithEmail();
        } else {
            return { customer: foundCustomer }
        }
    }
}