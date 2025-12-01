import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UnauthorizedException, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "../../../../app/auth/guards/local-auth.guard";
import { AuthService } from "../../../../app/auth/auth.service";
import { User } from "@app/entities/user/user";
import { Request as ExpressRequest } from "express";
import { IsPublic } from "@app/auth/decorators/is-public.decorator";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@app/auth/guards/jwt-auth.guard";
import { IsNotEmpty, IsString } from "class-validator";
import { removeRandomCharsFromToken } from "@helpers/overshadowedToken";
import { JwtService } from "@nestjs/jwt";

interface AuthRequest extends ExpressRequest {
    user: User
}
export class recoverPassValidateDTO {
    @IsNotEmpty()
    @IsString()
    token: string;
}
@ApiTags('auth')
@Controller()
export class AuthController {
    constructor(private readonly authservice: AuthService, private readonly jwtService: JwtService) { }
    @IsPublic()
    @Post('log-in')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async login(@Request() req: any) {
        const userTokenSession = await this.authservice.login(req);
        console.log('logando token', userTokenSession)
        return userTokenSession
    }
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Get('validate-token')

    async validateToken(@Request() req: any) {
        console.log('headers', req.headers)
        return
    }

    
    @IsPublic()
    @HttpCode(HttpStatus.OK)
    @Post('validate-recover-pass-token')
    async recoverPassValidate(@Body() body: recoverPassValidateDTO) {
        if (body?.token?.length < 265) {
            console.log('Token fornecido está tendo um length menor que 265');
            throw new UnauthorizedException('Unauthorized');
        }
        const recoverPassToken = body.token;
        const deobfuscatedToken = removeRandomCharsFromToken(recoverPassToken);
        try {
            const verifiedToken = this.jwtService.verify(deobfuscatedToken, { secret: process.env.JWT_USER_PASS_RECOVER_SECRET });
            console.log(verifiedToken);
        return
        } catch (error) {
            console.log(error.constructor.name, error.message)
            throw new UnauthorizedException('Unauthorized');
        }
    }
}