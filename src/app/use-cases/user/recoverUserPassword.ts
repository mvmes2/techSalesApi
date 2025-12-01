import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { generateNewJwtShadowed } from '@helpers/generateJwtShadowed';
import { removeRandomCharsFromToken } from '@helpers/overshadowedToken';
import { UserRepository } from '@app/repositories/user/user-repository';
import { MailerService } from '@external/mailer/mailer.service';
import { spTimeZoneDate } from '@helpers/dateSpTimezone';

export interface RecoverPasswordRequest {
  email: string;
}

@Injectable()
export class RecoverPasswordService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailerService: MailerService,
  ) {}

  async execute(request: RecoverPasswordRequest): Promise<void> {
    const { email } = request;

    // Busca o usuário pelo e-mail
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    // Criação do token JWT
    const payload = {
      user_id: user.id,
      user_email: user.user_email.value,
    };
    const token = generateNewJwtShadowed(
      { data: JSON.stringify(payload) },
      '10m',
      process.env.JWT_USER_PASS_RECOVER_SECRET,
    );

    // Envio de e-mail com o link de recuperação
    const recoveryLink = `${process.env.BASE_URL_CLIENT}/recover-pass/${token}`;
    const template = 'password-recovery'
    const contextLinks = {
      user_email: user.user_email.value,
      recovery_link: recoveryLink,
    };
    this.mailerService.sendMail(user.user_email.value, 'recuperacao de senha', template, contextLinks);

    // Atualização do token de recuperação no banco de dados
    const cleanToken = removeRandomCharsFromToken(token);
    const updateInfo = {
        user_id: user.id,
        update: { last_recover_pass_token: cleanToken }
    }
    await this.userRepository.update(updateInfo);
  }
}
