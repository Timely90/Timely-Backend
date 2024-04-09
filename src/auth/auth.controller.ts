import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto, UpdateUserDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./guard/auth.guard";
import { EmailDto, PassEmailDto } from "./dto/pass.dto";

@ApiTags('Auth')
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,) { }

  @Post("register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Patch("update")
  async update(@Body() updateUserDto: UpdateUserDto) {
    const {id, name, email, rol } = updateUserDto;
    return this.authService.updateEmailUser(id, name, email, rol);
  }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("email")
  emailRegister(@Body() email: EmailDto) {
    return this.authService.registerEmail(email);
  }

  @Patch('update-password-email')
  @UseGuards(AuthGuard)
  updatePasswordEmail(@Request() req, @Body() passDto: PassEmailDto) {
    return this.authService.updatePasswordEmail(req.user.email, passDto);
  }

  @Patch('tokens-verifi')
  @UseGuards(AuthGuard)
  updateVerification(@Request() req, @Body() isVerified: boolean) {
    return this.authService.updateVerificacion(req.user.email, isVerified);
  }

  @Get("estilista")
  findAllEstilista() {
    return this.authService.findAllEmailEstilista();
  }

  @Get("empleado")
  findAllEmpleado() {
    return this.authService.findAllEmailEmpleado();
  }

  @Get('admin:email')
  async findByEmail(@Param('email') email: string) {
    return this.authService.findByAdministrador(email); 
  }

}



