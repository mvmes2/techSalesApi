import { Customer } from "@app/entities/customer/customer";
import { CustomerRepository } from "@app/repositories/customer/customer-repository";
import { generateNewJwtShadowed } from "@helpers/generateJwtShadowed";
import { Injectable } from "@nestjs/common";

export interface GetCustomerByIdResponse {
    customer: string;
}

export interface GetCustomerByIdRequest {
    id: string;
}
@Injectable()
export class GetCustomerById {
    constructor(private customerRepository: CustomerRepository){}
    async execute(request: GetCustomerByIdRequest): Promise<GetCustomerByIdResponse> {
        const { id } = request;

        const customer = await this.customerRepository.findById(id);
        const jwtedCostumer = generateNewJwtShadowed({ data: JSON.stringify(customer)});
        return {
            customer: jwtedCostumer
        }
    }
}