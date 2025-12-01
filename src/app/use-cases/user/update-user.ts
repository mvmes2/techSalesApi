import { UserRepository } from "@app/repositories/user/user-repository";
import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { spTimeZoneDate } from "@helpers/dateSpTimezone";
import { UserNotFound } from "./errors/user-not-found-error";

export interface UpdateUserRequest {
    user_id: string
    update: {
        name?: string;
        email?: string;
        password?: string;
        cpf?: string;
        deleted_at?: string;
        last_token_pass_recover?: string;
    }
}

@Injectable()
export class UpdateUser {
    constructor(private userRepository: UserRepository){}
    async execute(request: UpdateUserRequest): Promise<void> {
        const { user_id } = request;
        const { name, email, password, cpf, deleted_at, last_token_pass_recover} = request.update

        const userFound = await this.userRepository.findById(user_id);

        if (!userFound) {
            throw new UserNotFound();
        } else {
            const updateUser = {
                user_id: user_id,
                update: {
                    user_name: name ?? userFound.user_name,
                    user_email: email ?? userFound.user_email.value,
                    user_password: password ? await bcrypt.hash(password, 11) : userFound.user_password,
                    user_cpf: cpf ?? userFound.user_cpf,
                    updated_at: spTimeZoneDate(new Date()),
                    deleted_at: deleted_at ?? userFound.deleted_at,
                    last_recover_pass_token: last_token_pass_recover ?? userFound.last_recover_pass_token
                }                
            };

            await this.userRepository.update(updateUser);
    
            return
        }       
    }
}