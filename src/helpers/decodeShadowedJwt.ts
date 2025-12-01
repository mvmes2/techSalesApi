import { JwtService } from "@nestjs/jwt"
import { removeRandomCharsFromToken } from "./overshadowedToken";

export const decodeToken = (token: string) => {
    const jwtService =  new JwtService;
    const unshadowToken = removeRandomCharsFromToken(token);
    let data = null;
    try {
        const decodedToken = jwtService.decode(unshadowToken);
        const parsedToken = JSON.parse(decodedToken);
        data = parsedToken;
    } catch (err) {
        console.log('(decodedShadowedJwt.ts -> decodeToken()) -> decode token error... ', err);
    }
    

    return data;
}