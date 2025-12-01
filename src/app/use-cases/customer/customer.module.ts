import { DatabaseModule } from "@external/database/database.module";
import { Module } from "@nestjs/common";
import { CreateCustomer } from "./create-customer";
import { GetAllCustomers } from "./get-all-customers";
import { GetOneCustomer } from "./get-customer-by-email";
import { CustomerService } from "./service/customer.service";
import { UpdateCustomerByField } from "./update-customer-by-field";
import { GetCustomerById } from "./get-customer-by-id";

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [
        CustomerService,
        CreateCustomer,
        GetAllCustomers,
        GetOneCustomer,
        UpdateCustomerByField,
        GetCustomerById
    ],
    exports: [
        CustomerService,
        CreateCustomer,
        GetAllCustomers,
        GetOneCustomer,
        UpdateCustomerByField,
        GetCustomerById
    ]
})
export class CustomerModule {}