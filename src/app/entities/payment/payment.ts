import { spTimeZoneDate } from "@helpers/dateSpTimezone";
import { Replace } from "@helpers/Replace";
import { randomUUID } from "crypto";

export interface PaymentProps {
    company_id: string;
    card_brand?: string | null;
    bank_name?: string | null;
    description?: string | null;
    value: number;
    created_at: Date;
    deleted_at?: Date | null;
    sale_id: string;
    customer_id?: string | null;
    user_id: string;
}

export class Payment {
    private _id: string;
    private props: PaymentProps;

    constructor(props: Replace<PaymentProps, { created_at?: Date }>, id?: string) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            created_at: props.created_at ?? spTimeZoneDate(new Date()),
        };
    }

    public get id(): string {
        return this._id;
    }

    public get created_at(): Date {
        return this.props.created_at;
    }

    public set company_id(company_id: string) {
        this.props.company_id = company_id;
    }

    public get company_id(): string {
        return this.props.company_id;
    }

    public set card_brand(card_brand: string) {
        this.props.card_brand = card_brand;
    }

    public get card_brand(): string {
        return this.props.card_brand;
    }
    public set bank_name(bank_name: string) {
        this.props.bank_name = bank_name;
    }

    public get bank_name(): string {
        return this.props.bank_name;
    }
    public set description(description: string) {
        this.props.description = description;
    }

    public get description(): string | null | undefined {
        return this.props.description;
    }
    public set value(value: number) {
        this.props.value = value;
    }

    public get value(): number {
        return this.props.value;
    }
    public set deleted_at(deleted_at: Date) {
        this.props.deleted_at = deleted_at;
    }

    public get deleted_at(): Date {
        return this.props.deleted_at;
    }
    public set sale_id(sale_id: string) {
        this.props.sale_id = sale_id;
    }

    public get sale_id(): string {
        return this.props.sale_id;
    }
    public set customer_id(customer_id: string) {
        this.props.customer_id = customer_id;
    }

    public get customer_id(): string | null | undefined {
        return this.props.customer_id;
    }
    public set user_id(user_id: string) {
        this.props.customer_id = user_id;
    }

    public get user_id(): string {
        return this.props.user_id;
    }
}