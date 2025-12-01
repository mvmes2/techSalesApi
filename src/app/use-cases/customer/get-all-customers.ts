import { Customer } from "@app/entities/customer/customer";
import { CustomerRepository } from "@app/repositories/customer/customer-repository";
import { generateNewJwtShadowed } from "@helpers/generateJwtShadowed";
import { Injectable } from "@nestjs/common";

export interface GetAllCustomersReponse {
    customers: string;
}

export interface GetAllCustomersRequest {
    company_id: string;
}
@Injectable()
export class GetAllCustomers {
    constructor(private customerRepository: CustomerRepository){}
    async execute(request: GetAllCustomersRequest): Promise<GetAllCustomersReponse> {
        const { company_id } = request;

        const customers = await this.customerRepository.getAllCustomers(company_id);
        const jwtedCostumers = generateNewJwtShadowed({ data: JSON.stringify(customers)});
        return {
            customers: jwtedCostumers
        }
    }
}