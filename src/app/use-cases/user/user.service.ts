import { Injectable } from "@nestjs/common";
import { CreateUser, CreateUserRequest, CreateUserResponse } from "./create-user";
import { GetUserByEmail, GetUserByEmailRequest, GetUserByEmailResponse } from "./get-user-by-email";
import { GetUserById, GetUserByIdRequest, GetUserByIdResponse } from "./get-user-by-id";
import { UpdateUser, UpdateUserRequest } from "./update-user";
import { CheckUserPassRecoverToken, CheckUserPassRecoverTokenRequest } from "./check-user-pass-recover-token";
import { RecoverPasswordRequest, RecoverPasswordService } from "./recoverUserPassword";

@Injectable()
export class UserService {
    constructor(
        private createUser: CreateUser,
        private getUserByEmail: GetUserByEmail,
        private getUserById: GetUserById,
        private updateUser: UpdateUser,
        private checkUserPassRecoverToken: CheckUserPassRecoverToken,
        private recoverPasswordService: RecoverPasswordService
    ) {}

    async create(request: CreateUserRequest): Promise<CreateUserResponse> {
        return await this.createUser.execute(request);
    }
    async getByEmail(request: GetUserByEmailRequest): Promise<GetUserByEmailResponse> {
        return await this.getUserByEmail.execute(request);
    }

    async getById(request: GetUserByIdRequest): Promise<GetUserByIdResponse> {
        return await this.getUserById.execute(request);
    }

    async userUpdate(request: UpdateUserRequest): Promise<void> {
        return await this.updateUser.execute(request);
    }

    async userCheckRecoverPassToken(request: CheckUserPassRecoverTokenRequest): Promise<Boolean> {
        return await this.checkUserPassRecoverToken.execute(request);
    }

    async recoverUserPassword(request: RecoverPasswordRequest): Promise<void> {
        return await this.recoverPasswordService.execute(request);
    }

}