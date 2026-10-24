import userRepository from "../repositories/user_repository";
import { ICreateUserData } from "../types/users";

class UserService {
  async createUser(data: ICreateUserData) {
    const email = data.email.trim().toLowerCase();

    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      return {
        error: "Este e-mail já está cadastrado.",
      };
    }

    const user = await userRepository.create({
      name: data.name.trim(),
      email,
    });

    return { user };
  }

  async getAllUsers() {
    return userRepository.findAll();
  }

  async getUserById(id: string) {
    return userRepository.findById(id);
  }

  async updateUser(id: string, data: Partial<ICreateUserData>) {
    const updateData = { ...data };

    if (updateData.email !== undefined) {
      updateData.email = updateData.email.trim().toLowerCase();

      const existingUser = await userRepository.findByEmail(updateData.email);

      if (existingUser && existingUser.id !== id) {
        return {
          error: "Este e-mail já está cadastrado.",
        };
      }
    }

    if (updateData.name !== undefined) {
      updateData.name = updateData.name.trim();
    }

    const user = await userRepository.update(id, updateData);

    return { user };
  }

  async deleteUser(id: string) {
    return userRepository.delete(id);
  }
}

export default new UserService();
