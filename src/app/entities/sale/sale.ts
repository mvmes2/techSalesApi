import { Replace } from "src/helpers/Replace";
import { randomUUID } from "crypto";
import { SessionProps } from "../session/session";
import { CompanyProps } from "../company/company";
import { spTimeZoneDate } from "@helpers/dateSpTimezone";
import { Payment } from "../payment/payment";

export interface SaleProps {
    company_id: string;
    value: number;
    paid_value: number;
    full_paid?: boolean;
    discount_id: string;
    customer_id: string;
    user_id: string;
    product_chart_id: string;
    service_order_chart_id: string;
    payments?: Payment[] | null;
    created_at: Date;
    updated_at?: Date | null;
    deleted_at?: Date | null;
}

export class Sale {
    private _id: string;
    private props: SaleProps;

    constructor(props: Replace<SaleProps, { created_at?: Date }>, id?: string) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            created_at: props.created_at ?? spTimeZoneDate(new Date()),
        };
    }

    public get id(): string {
        return this._id;
    }
    public get payments(): Payment[] | null | undefined {
        return this.props.payments;
    }
    public get created_at(): Date {
        return this.props.created_at;
    }

    public get company_id(): string {
        return this.props.company_id;
    }

    public set company_id(company_id: string) {
        this.props.company_id = company_id;
    }

    public get value(): number {
        return this.props.value;
    }

    public set value(value: number) {
        this.props.value = value;
    }

    public get paid_value(): number {
        return this.props.paid_value;
    }

    public set paid_value(paid_value: number) {
        this.props.paid_value = paid_value
    }

    public get full_paid(): boolean {
        return this.props.full_paid;
    }

    public set full_paid(full_paid: boolean) {
        this.props.full_paid = full_paid
    }

    public get discount_id(): string {
        return this.props.discount_id;
    }

    public set discount_id(discount_id: string) {
        this.props.discount_id = discount_id
    }
    public get customer_id(): string {
        return this.props.customer_id;
    }

    public set customer_id(customer_id: string) {
        this.props.customer_id = customer_id
    }
    public get user_id(): string {
        return this.props.user_id;
    }

    public set user_id(user_id: string) {
        this.props.user_id = user_id
    }
    public get product_chart_id(): string {
        return this.product_chart_id;
    }

    public set product_chart_id(product_chart_id: string) {
        this.props.product_chart_id = product_chart_id
    }
    public get service_order_chart_id(): string {
        return this.props.service_order_chart_id;
    }

    public set service_order_chart_id(service_order_chart_id: string) {
        this.props.service_order_chart_id = service_order_chart_id
    }

    public get updated_at(): Date {
        return this.props.updated_at;
    }

    public set updated_at(updated_at: Date) {
        this.props.updated_at = updated_at
    }

    public get deleted_at(): Date {
        return this.props.deleted_at;
    }

    public set deleted_at(deleted_at: Date) {
        this.props.deleted_at = deleted_at
    }

}