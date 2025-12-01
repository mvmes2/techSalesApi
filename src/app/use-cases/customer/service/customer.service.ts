import { Injectable } from "@nestjs/common";
import { CreateCustomer, CreateCustomerRequest, CreateCustomerResponse } from "../create-customer";
import { GetOneCustomer, getOneCustomerRequest, getOneCustomerResponse } from "../get-customer-by-email";
import { GetAllCustomers, GetAllCustomersReponse, GetAllCustomersRequest } from "../get-all-customers";
import { UpdateByFieldRequest, UpdateCustomerByField } from "../update-customer-by-field";
import { GetCustomerById, GetCustomerByIdRequest, GetCustomerByIdResponse } from "../get-customer-by-id";

@Injectable()
export class CustomerService {
    constructor(
        	private createrCustomer: CreateCustomer,
            private getOneCustomer: GetOneCustomer,
            private getAllCustomers: GetAllCustomers,
            private getCustomerById: GetCustomerById,
            private updateCustomerByField: UpdateCustomerByField
    ) {}

    async create(request: CreateCustomerRequest):Promise<CreateCustomerResponse> {
        return await this.createrCustomer.execute(request);
    }
    async getOne(request: getOneCustomerRequest):Promise<getOneCustomerResponse> {
        return await this.getOneCustomer.execute(request);
    }

    async getAll(request: GetAllCustomersRequest):Promise<GetAllCustomersReponse> {
        return await this.getAllCustomers.execute(request);
    }

    async getById(request: GetCustomerByIdRequest):Promise<GetCustomerByIdResponse> {
        return await this.getCustomerById.execute(request);
    }

    async updateByField(request: UpdateByFieldRequest):Promise<void> {
        return await this.updateCustomerByField.execute(request);
    }
}