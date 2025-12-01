import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import * as fs from 'fs';
import * as handlebars from 'handlebars';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.your-email-provider.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // Use true para SSL/TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  /**
   * Compila um template de e-mail usando Handlebars.
   * @param templateName Nome do arquivo do template (sem extensão).
   * @param context Objeto com as variáveis para o template.
   * @returns Conteúdo do e-mail como HTML.
   */
  private compileTemplate(templateName: string, context: object): string {
    // Define o caminho base
    const basePath = process.env.NODE_ENV === 'production'
      ? path.resolve(__dirname, './templates') // Produção (dist)
      : path.resolve(process.cwd(), 'src/external/mailer/templates'); // Desenvolvimento (src)
  
    const templatePath = path.join(basePath, `${templateName}.html`);
  
    // Verifica se o arquivo existe
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template file not found: ${templatePath}`);
    }
  
    // Compila o template
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = handlebars.compile(templateSource);
    return compiledTemplate(context);
  }
  
  

  /**
   * Envia um e-mail utilizando o serviço configurado.
   * @param to Endereço de e-mail do destinatário.
   * @param subject Assunto do e-mail.
   * @param template Nome do template a ser usado.
   * @param context Objeto com variáveis para o template (opcional).
   * @returns Promise que resolve quando o e-mail é enviado.
   */
  async sendMail(to: string, subject: string, template: string, context?: object): Promise<void> {
    const htmlContent = this.compileTemplate(template, context || {});

    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject,
      html: htmlContent, // O conteúdo do e-mail como HTML
    };

    await this.transporter.sendMail(mailOptions);
  }
}
