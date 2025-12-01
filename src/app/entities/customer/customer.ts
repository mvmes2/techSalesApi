import { randomUUID } from "crypto";
import { Email } from "../user/validations/user.email.validation";
import { Replace } from "@helpers/Replace";
import { spTimeZoneDate } from "@helpers/dateSpTimezone";
import { Sale } from "../sale/sale";

export interface CustomerProps {
  company_id: string;
  customer_name: string;
  customer_email: string;
  customer_address?: string | null;
  customer_address_number?: string | null;
  customer_city?: string | null;
  customer_state?: string | null; 
  customer_cep?: string | null;
  customer_neighborhood?: string | null;
  customer_phone_number?: string | null;
  customer_cpf?: string | null;
  created_at: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
  sales?: Sale[] | null;
}
export class Customer {
  private _id: string;
  private props: CustomerProps;

  constructor(props: Replace<CustomerProps, { created_at?: Date }>, id?: string) {
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
  public get sales(): Sale[] | null | undefined {
    return this.props.sales;
  }

  public get company_id(): string {
    return this.props.company_id;
  }

  public set company_id(company_id: string) {
    this.props.company_id = company_id;
  }

  public get customer_name(): string {
    return this.props.customer_name;
  }

  public set customer_name(customer_name: string) {
    this.props.customer_name = customer_name;
  }

  public get customer_email(): string {
    return this.props.customer_email;
  }

  public set customer_email(customer_email: string) {
    this.props.customer_email = customer_email;
  }

  public get customer_address(): string | null | undefined {
    return this.props.customer_address;
  }

  public set customer_address(customer_address: string) {
    this.props.customer_address = customer_address;
  }

  public get customer_address_number(): string | null | undefined {
    return this.props.customer_address_number;
  }

  public set customer_address_number(customer_address_number: string) {
    this.props.customer_address_number = customer_address_number;
  }
  public get customer_city(): string | null | undefined {
    return this.props.customer_city;
  }

  public set customer_city(customer_city: string) {
    this.props.customer_city = customer_city;
  }
  public get customer_state(): string | null | undefined {
    return this.props.customer_state;
  }

  public set customer_state(customer_state: string) {
    this.props.customer_state = customer_state;
  }

  public get customer_neighborhood(): string | null | undefined {
    return this.props.customer_neighborhood;
  }

  public set customer_neighborhood(customer_neighborhood: string) {
    this.props.customer_neighborhood = customer_neighborhood;
  }

  public get customer_cep(): string | null | undefined {
    return this.props.customer_cep;
  }

  public set customer_cep(customer_cep: string) {
    this.props.customer_cep = customer_cep;
  }

  public get customer_phone_number(): string | null | undefined {
    return this.props.customer_phone_number;
  }

  public set customer_phone_number(customer_phone_number: string) {
    this.props.customer_phone_number = customer_phone_number;
  }

  public get customer_cpf(): string | null | undefined {
    return this.props.customer_cpf;
  }

  public set customer_cpf(customer_cpf: string) {
    this.props.customer_cpf = customer_cpf;
  }

  public get updated_at(): Date | null | undefined {
    return this.props.updated_at;
  }

  public set updated_at(updated_at: Date) {
    this.props.updated_at = updated_at;
  }

  public get deleted_at(): Date | null | undefined {
    return this.props.deleted_at;
  }

  public set deleted_at(deleted_at: Date) {
    this.props.deleted_at = deleted_at;
  }

}