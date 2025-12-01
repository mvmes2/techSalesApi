import { Customer } from "@app/entities/customer/customer";


export abstract class CustomerRepository {
    abstract create(customer: Customer): Promise<void>;
    abstract findByEmailAndCompanyId(email: string, company_id: string): Promise<any>;
    abstract findByCpf(cpf: string, company_id: string): Promise<any>;
    abstract findById(id: string): Promise<any>;
    abstract getAllCustomers(company_id: string): Promise<any[] | null>;
    abstract updateByField(customer_id: string, field: string, data: any): Promise<void>;
}