import { Replace } from "src/helpers/Replace";
import { Email } from "./validations/user.email.validation";
import { randomUUID } from "crypto";
import { SessionProps } from "../session/session";
import { CompanyProps } from "../company/company";
import { spTimeZoneDate } from "@helpers/dateSpTimezone";

export interface UserProps {
    user_name: string;
    user_email: Email;
    company_id: string;
    user_password: string;
    user_cpf: string;
    user_level: number;
    company?: CompanyProps;
    sessions?: SessionProps[];
    created_at: Date;
    updated_at?: Date | null;
    deleted_at?: Date | null;
    last_recover_pass_token?: string;
  }

export class User {
    private _id: string;
    private props: UserProps;

    constructor(props: Replace<UserProps, { created_at?: Date }>, id?: string) {
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            created_at: props.created_at ?? spTimeZoneDate(new Date()),
        };
    }

    public get id(): string{
      return this._id;
    }

    public set user_name(user_name: string){
        this.props.user_name = user_name;
    }

    public get user_name(): string{
      return this.props.user_name;
    }

    public set user_email(user_email: Email){
        this.props.user_email = user_email;
    }
    
    public get user_email(): Email{
      return this.props.user_email;
    }

    public set user_password(user_password: string){
        this.props.user_password = user_password;
    }
    
    public get user_password(): string{
      return this.props.user_password;
    }

    public get created_at(): Date{
        return this.props.created_at;
      }
    
    public get updated_at(): Date | null | undefined{
      return this.props.updated_at;
    }

    public get deleted_at(): Date | null | undefined{
      return this.props.deleted_at;
    }

    public set deleted_at(date: Date){
       this.props.deleted_at = date;
    }

    public get company_id(): string{
        return this.props.company_id;
      }
  
      public set company_id(company_id: string){
         this.props.company_id = company_id;
      }

      public get user_cpf(): string{
        return this.props.user_cpf;
      }
  
      public set user_cpf(user_cpf: string){
         this.props.user_cpf = user_cpf;
      }
      public get user_level(): number{
        return this.props.user_level;
      }
  
      public set user_level(user_level: number){
         this.props.user_level = user_level;
      }

      public get last_recover_pass_token(): string{
        return this.props.last_recover_pass_token;
      }
  
      public set last_recover_pass_token(last_recover_pass_token: string){
         this.props.last_recover_pass_token = last_recover_pass_token;
      }

      get sessions(): SessionProps[] | null | undefined {
        return this.props.sessions;
      }

      get company(): CompanyProps | null | undefined {
        return this.props.company;
      }
}