import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserTimely } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserTimely)
    private readonly usersRepository: Repository<UserTimely>
  ) { }

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async findOneById(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async updatePassword(email: string, newPassword: string) {
    const user = await this.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }

    await this.usersRepository.update({ email }, { password: newPassword });
  }

  async findAllEmails() {
    const emails = await this.usersRepository
      .createQueryBuilder('user')
      .select(['user.email'])
      .getMany();
    const emailes = emails.map(user => user.email);
    return { emailes }
  }

  async updateVerifi(email: string, isVerified: boolean) {
    const user = await this.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }

    await this.usersRepository.update({ email }, { isVerified: true });
  }

  async updateEmailUser(id:number, name: string, email: string, rol:string) {
    await this.usersRepository.update({id},{email,name,rol});
  }

  async updatePasswordEmail(email: string, password: string) {
    const user = await this.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException("Usuario no encontrado");
    }

    await this.usersRepository.update({ email }, { password: password });
  }

  async findAllUser() {
    const users = await this.usersRepository.find();
    return users;
  }

}
