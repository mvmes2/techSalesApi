import { Customer } from "@app/entities/customer/customer";
import { Payment } from "@app/entities/payment/payment";
import { Sale } from "@app/entities/sale/sale";
import { Email } from "@app/entities/user/validations/user.email.validation";

export type RawCustomer = {
    id: string;
    company_id: string;
    customer_name: string;
    customer_email: string;
    customer_address?: string;
    customer_address_number?: string;
    customer_phone_number?: string;
    customer_cep?: string;
    customer_neighborhood?: string;
    customer_city?: string;
    customer_state?: string;
    customer_cpf?: string;
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
    sales?: Sale[];
}

export class PrismaCustomerMapper {

    static toPrisma(customer: Customer) {

        return {
            id: customer.id,
            company_id: customer.company_id,
            customer_name: customer.customer_name,
            customer_email: customer.customer_email,
            customer_address: (customer.customer_address == '' || !customer.customer_address) ? null : customer.customer_address,
            customer_address_number: (customer.customer_address_number == '' || !customer.customer_address_number) ? null : customer.customer_address_number,
            customer_cep: (customer.customer_cep == '' || !customer.customer_cep) ? null : customer.customer_cep,
            customer_neighborhood: (customer.customer_neighborhood == '' || !customer.customer_neighborhood) ? null : customer.customer_neighborhood,
            customer_city: (customer.customer_city == '' || !customer.customer_city) ? null : customer.customer_city,
            customer_state: (customer.customer_state == '' || !customer.customer_state) ? null : customer.customer_state,
            customer_phone_number: (customer.customer_phone_number == '' || !customer.customer_phone_number) ? null : customer.customer_phone_number,
            customer_cpf: (customer.customer_cpf == '' || !customer.customer_cpf) ? null : customer.customer_cpf,
            updated_at: !customer.updated_at ? null : customer.updated_at,
            created_at: customer.created_at,
            deleted_at: !customer.deleted_at ? null : customer.deleted_at
        }
    }

    static toDomain(raw: RawCustomer) {
        const sales = raw.sales
            ? raw.sales.map(sale => new Sale({
                company_id: sale.company_id,
                value: sale.value,
                paid_value: sale.paid_value,
                full_paid: sale.full_paid,
                discount_id: sale.discount_id,
                customer_id: sale.customer_id,
                user_id: sale.user_id,
                product_chart_id: sale.product_chart_id,
                service_order_chart_id: sale.service_order_chart_id,
                created_at: sale.created_at,
                updated_at: sale.updated_at,
                deleted_at: sale.deleted_at,
                payments: sale.payments ? sale.payments.map(payment => new Payment({
                    company_id: payment.company_id,
                    card_brand: payment.card_brand,
                    bank_name: payment.bank_name,
                    description: payment.description,
                    value: payment.value,
                    sale_id: payment.sale_id,
                    customer_id: payment.customer_id,
                    user_id: payment.user_id,
                    created_at: payment.created_at,
                    deleted_at: payment.deleted_at,
                })) : undefined
            }))
            : undefined;


        return {
            company_id: raw.company_id,
            customer_name: raw.customer_name,
            customer_email: raw.customer_email,
            customer_address: raw.customer_address,
            customer_address_number: raw.customer_address_number,
            customer_cep: raw.customer_cep,
            customer_phone_number: raw.customer_phone_number,
            customer_cpf: raw.customer_cpf,
            customer_neighborhood: raw.customer_neighborhood,
            customer_city: raw.customer_city,
            customer_state: raw.customer_state,
            created_at: raw.created_at,
            updated_at: raw.updated_at,
            deleted_at: raw.deleted_at,
            sales: sales,
        }
    }
}