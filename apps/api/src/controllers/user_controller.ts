import { Request, Response } from "express";
import userService from "../services/user_service";

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const { name, email } = req.body;

      if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        !name.trim() ||
        !email.trim()
      ) {
        return res.status(400).json({
          message: "Nome e e-mail são obrigatórios.",
        });
      }

      if (name.trim().length < 3) {
        return res.status(400).json({
          message: "O nome deve ter no mínimo 3 caracteres.",
        });
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return res.status(400).json({
          message: "O e-mail informado é inválido.",
        });
      }

      const result = await userService.createUser({ name, email });

      if ("error" in result) {
        return res.status(409).json({
          message: result.error,
        });
      }

      return res.status(201).json(result.user);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);

      return res.status(400).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();

      return res.status(200).json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);

      return res.status(400).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };

      const user = await userService.getUserById(id);

      if (!user) {
        return res.status(404).json({
          message: "Usuário não encontrado.",
        });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);

      return res.status(404).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const { name, email } = req.body;

      if (name === undefined && email === undefined) {
        return res.status(400).json({
          message: "Informe pelo menos um campo para atualizar.",
        });
      }

      if (
        name !== undefined &&
        (typeof name !== "string" || name.trim().length < 3)
      ) {
        return res.status(400).json({
          message: "O nome deve ter no mínimo 3 caracteres.",
        });
      }

      if (
        email !== undefined &&
        (typeof email !== "string" ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      ) {
        return res.status(400).json({
          message: "O e-mail informado é inválido.",
        });
      }

      const result = await userService.updateUser(id, { name, email });

      if ("error" in result) {
        return res.status(409).json({
          message: result.error,
        });
      }

      return res.status(200).json(result.user);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);

      return res.status(400).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };

      const user = await userService.getUserById(id);

      if (!user) {
        return res.status(404).json({
          message: "Usuário não encontrado.",
        });
      }

      await userService.deleteUser(id);

      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);

      return res.status(404).json({
        message: error instanceof Error ? error.message : "Unexpected error",
      });
    }
  }
}

export default new UserController();
