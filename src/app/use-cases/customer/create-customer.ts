import { Email } from "@app/entities/user/validations/user.email.validation";
import { CustomerRepository } from "@app/repositories/customer/customer-repository";
import { error } from "console";
import { CustomerAlreadyExists } from "./errors/customer-already-exists-error";
import { Customer } from "@app/entities/customer/customer";
import { spTimeZoneDate } from "@helpers/dateSpTimezone";
import { Injectable } from "@nestjs/common";
import { CustomerCpfAlreadyExists } from "./errors/customer-cpf-already-exists-error";
import { capitalizeWords } from "@helpers/captalizeWords";

export interface CreateCustomerRequest {
    company_id: string;
    customer_name: string;
    customer_email: string;
    customer_address?: string | null;
    customer_address_number?: string | null;
    customer_cep?: string | null;
    customer_neighborhood?: string | null;
    customer_city?: string | null;
    customer_state?: string | null;
    customer_phone_number?: string | null;
    customer_cpf?: string | null;
}

export interface CreateCustomerResponse {
    customer: Customer;
}
@Injectable()
export class CreateCustomer {
    constructor(private readonly customerRepository: CustomerRepository) { }
    async execute(request: CreateCustomerRequest): Promise<CreateCustomerResponse> {
        const { company_id, customer_name, customer_email, customer_address, customer_address_number, customer_phone_number, customer_cpf, customer_neighborhood, customer_city, customer_state, customer_cep } = request;

        const customerFound = await this.customerRepository.findByEmailAndCompanyId(String(customer_email), company_id);
        const checkCpfCustomerExists = await this.customerRepository.findByCpf(customer_cpf, company_id);

        if (customerFound) {
            throw new CustomerAlreadyExists()
        } else if (checkCpfCustomerExists) {
            throw new CustomerCpfAlreadyExists()
        } else {
            const customer = new Customer({
                company_id,
                customer_name: capitalizeWords(customer_name),
                customer_email,
                customer_address,
                customer_address_number,
                customer_neighborhood,
                customer_city,
                customer_state,
                customer_cep,
                customer_phone_number,
                customer_cpf,
                created_at: spTimeZoneDate(new Date())
            });
            await this.customerRepository.create(customer);
            return {
                customer
            }
        }
    }
}