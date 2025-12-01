import { JwtService } from "@nestjs/jwt"
import { CONFIGS } from "src/configs/globalConfigs";
import { addRandomCharsToToken } from "./overshadowedToken";

/**
   * Envia um e-mail utilizando o serviço configurado.
   * @param payload Objeto com informações do usuário para assinar o token.
   * @param expiration tempo de expiração do token E.G: 5 minutos = '5m' (Optional) se não passado assume o default de 7 dias.
   * @param newSecret Usa um novo secret para assinar o token (Optional, se não fornecido assumira o secret padrao para usuario definido no .env, ao passar um novo secret use sempre o .env)
   * @returns Retorna um JWT token ofuscado.
   */
export const generateNewJwtShadowed = (payload: object, expiration?: string, newSecret?: string) => {
    const jwtService =  new JwtService;

    const generatedUserToken = jwtService.sign(payload, { secret: newSecret || process.env.JWT_USER_AUTH_SECRET, expiresIn: expiration || CONFIGS.userJwtExpires });
    const shadowedToken = addRandomCharsToToken(generatedUserToken);

    return shadowedToken;
}
