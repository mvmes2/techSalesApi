import { UserRepository } from "@app/repositories/user/user-repository";
import { removeRandomCharsFromToken } from "@helpers/overshadowedToken";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";

export interface CheckUserPassRecoverTokenRequest {
    token: string;
    user_id: string;
}
@Injectable()
export class CheckUserPassRecoverToken {
    constructor(private userRepository: UserRepository, private readonly jwtService: JwtService) {}

    async execute(request: CheckUserPassRecoverTokenRequest): Promise<Boolean> {
        const { token, user_id } = request;
        const cleanToken = removeRandomCharsFromToken(token);
        const getUser = await this.userRepository.findById(user_id)
        if(getUser && getUser.last_recover_pass_token === cleanToken) {
            try {
                this.jwtService.verify(cleanToken, { secret: process.env.JWT_USER_PASS_RECOVER_SECRET });
            } catch (err) {
                return false
            }
            return true
        }
        return false
    }
}