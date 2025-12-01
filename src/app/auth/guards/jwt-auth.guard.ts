import { ExecutionContext, Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { addRandomCharsToToken, removeRandomCharsFromToken } from '@helpers/overshadowedToken'; // Importe sua função de desofuscação aqui

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true; // Se for rota pública, não aplica o guard JWT
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (err || !token) {
        throw new UnauthorizedException(err || 'Unauthorized');
    }

    try {
        // Desofuscar o token antes de verificar
        const deobfuscatedToken = removeRandomCharsFromToken(token);
        const verifiedUser = this.jwtService.verify(deobfuscatedToken, { secret: process.env.JWT_USER_AUTH_SECRET });

        if (!verifiedUser && !verifiedUser?.userInfo) {
            throw new UnauthorizedException('Unauthorized');
        }
        request['user'] = JSON.parse(verifiedUser?.userInfo);

        return JSON.parse(verifiedUser?.userInfo);
    } catch (error) {
        throw new UnauthorizedException('Unauthorized');
    }
}

private extractTokenFromHeader(request: Request): string | undefined {

    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type === 'Bearer' && token) {
        return token;
    }
    return undefined;
}
}
