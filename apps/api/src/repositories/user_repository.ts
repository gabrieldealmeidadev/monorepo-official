import prisma from "../config/prisma";
import { ICreateUserData } from "../types/users";

export class UserRepository {
  async create(data: ICreateUserData) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findAll() {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async update(id: string, data: Partial<ICreateUserData>) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return user;
  }

  async delete(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

export default new UserRepository();
