import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { MailerService } from "@nestjs-modules/mailer"
import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login.dto";
import { EmailDto, PassDto, PassEmailDto } from "./dto/pass.dto";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService
  ) { }

  async findAllEmailEstilista() {
    const users = await this.usersService.findAllUser();
    const estilistas = users.filter(user => user.rol === 'estilista');
    return estilistas;
  }

  async findAllEmailEmpleado() {
    const users = await this.usersService.findAllUser();
    const empleados = users.filter(user => user.rol === 'secretario' || user.rol === 'cajero');
    return empleados;
  }

  async findByAdministrador(email: string) {
    const users = await this.usersService.findOneByEmail(email);
    return users;
  }

  async register({ password, email, rol, name, isVerified }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

    if (user) {
      throw new BadRequestException("Correo electrónico ya existe.");
    }

    if (!emailRegex.test(email)) {
      throw new BadRequestException("Ingrese un correo válido.");
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await this.usersService.create({
      name,
      email,
      rol,
      password: hashedPassword,
      isVerified
    });

    if (rol === "cliente") {
      const Usuario = { email, name, password }
      let correo = "register";
      await this.envioEmail(Usuario, email, correo);
    }

    return {
      message: "Usuario registrado correctamente.",
    };

  }

  async updateEmailUser(id: number, name: string, email: string) {
    const user = await this.usersService.findOneById(id);

    if (!user) {
      throw new UnauthorizedException("Usuario no existe");
    }

    await this.usersService.updateEmailUser(id, name, email);

    return { message: "Usuario actualizado correctamente" };

  }

  async updateVerificacion(email: string, isVerified: boolean) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Usuario no existe");
    }

    await this.usersService.updateVerifi(email, isVerified);

    const payload = { email: user.email, name: user.name };

    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      name: user.name,
      email: user.email,
      rol: user.rol
    };

  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Correo inválido");
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Contraseña inválido");
    }

    if (user.isVerified == false) {
      throw new UnauthorizedException("Su cuenta no está verificada");
    }

    const payload = { email: user.email, name: user.name };

    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      name: user.name,
      email: user.email,
      rol: user.rol
    };
  }

  async updatePasswordEmail(email: string, passDto: PassEmailDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Usuario no encontrado");
    }

    const hashedNewPassword = await bcryptjs.hash(passDto.password, 10);

    await this.usersService.updatePasswordEmail(email, hashedNewPassword);

    const payload = { email: user.email, name: user.name };

    const token = await this.jwtService.signAsync(payload);

    return {
      tokens: token,
      name: user.name,
      email: user.email,
      rol: user.rol,
      message: "Contraseña actualizada correctamente",
    };
  }

  async registerEmail({ email }: EmailDto) {

    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException("Correo electrónico no existe.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

    if (!emailRegex.test(email)) {
      throw new BadRequestException("Ingrese un correo válido.");
    }

    let correo = "verificacion";

    await this.envioEmail(user, email, correo);

    return { message: "Correo electrónico enviado." };

  }

  async envioEmail(user: any, email: string, correo: string) {

    const payload = { email: user.email, name: user.name };

    const token = await this.jwtService.signAsync(payload);

    let url: string;
    let filePath: string;

    if (correo == "register") {
      url = `https://timely12.netlify.app/timely-sesion?token=${token}`;
      filePath = path.resolve(process.cwd(), 'src/auth/html/plantillaReg.html');
    }

    if (correo == "verificacion") {
      url = `https://timely12.netlify.app/timely-passwordupemail?token=${token}`;
      filePath = path.resolve(process.cwd(), 'src/auth/html/plantilla.html');
    }

    const htmlTemplate = fs.readFileSync(filePath, 'utf8');
    const personalizedHtml = htmlTemplate
      .replace('{{name}}', user.name)
      .replace('{{token}}', url);

    await this.mailerService.sendMail({
      to: email,
      subject: "Correo de Timely",
      html: personalizedHtml,
    });

  }

}



