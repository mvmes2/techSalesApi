import { CustomerRepository } from "@app/repositories/customer/customer-repository";
import { CustomerNotFoundWithID } from "./errors/customer-nnot-found-byId-error";
import { Injectable } from "@nestjs/common";
import { NotAllowedAnnotherCompany } from "./errors/notAllowedOtherCompanny-error";
import { capitalizeWords } from "@helpers/captalizeWords";
import { CustomerCpfAlreadyExists } from "./errors/customer-cpf-already-exists-error";
import { CustomeremailAlreadyInUse } from "./errors/customerEmailAlreadyInUser-error";

export interface UpdateByFieldRequest {
    id: string;
    field: string;
    data: any;
    company_id: string;
}
@Injectable()
export class UpdateCustomerByField {
    constructor(private customerRepository: CustomerRepository) { }
    async execute(request: UpdateByFieldRequest): Promise<void> {

            const { id, field, data, company_id } = request;

            const customerFound = await this.customerRepository.findById(id);

            const dataCaptalized = field == 'customer_name' ? capitalizeWords(data) : data;

            const checkIfNewCpfAlreadyExists = field == 'customer_cpf' ? await this.customerRepository.findByCpf(data, company_id) : null;

            const checkIfNewEmailAlreadyInUse = field == 'customer_email' ? await this.customerRepository.findByEmailAndCompanyId(data, company_id) : null;

            if (!customerFound) {
                throw new CustomerNotFoundWithID()
            } else if (checkIfNewCpfAlreadyExists) {
                throw new CustomerCpfAlreadyExists()
            }else if (checkIfNewEmailAlreadyInUse) {
                throw new CustomeremailAlreadyInUse()           
            } else if (customerFound.company_id !== company_id) {
                throw new NotAllowedAnnotherCompany()
            } else {
                await this.customerRepository.updateByField(id, field, dataCaptalized);
            }
    }
}