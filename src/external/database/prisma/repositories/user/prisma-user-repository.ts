import { User } from "src/app/entities/user/user";
import { UserRepository } from "@app/repositories/user/user-repository";
import { PrismaService } from "../../prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaUserMapper } from "../../mappers/user/prisma-user-mapper";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private prismaService: PrismaService) {}
    async delete(id: string): Promise<void> {

        await this.prismaService.user.update({ where: { id }, data: { deleted_at: new Date() } });

    }
    async findById(id: string): Promise<User> {
        const foundUser = await this.prismaService.user.findUnique({ where: { id }, include: { company: true, sessions: true } });
        if (!foundUser) {
            return null
        }
        return PrismaUserMapper.toDomain(foundUser);
    }
    async update(updateInfo: any): Promise<void> {
        await this.prismaService.user.update({ where: { id: updateInfo.user_id }, data: updateInfo.update });
        return;
    }
    async findByEmail(email: string): Promise<User | null> {
        const foundUser = await this.prismaService.user.findFirst({ where: { user_email: email }, include: { company: true, sessions: true } });
        if (!foundUser) {
            return null
        }
        return PrismaUserMapper.toDomain(foundUser);
    }
    async create(user: User): Promise<void> {
        const rawUser = PrismaUserMapper.toPrisma(user);
        await this.prismaService.user.create({
            data: rawUser
        });
        return;
    }
}