import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { User } from "./types/user";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface UserForm {
  name: string;
  email: string;
  password: string;
}

const emptyForm: UserForm = {
  name: "",
  email: "",
  password: "",
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<UserForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/users`);
      const data: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error("Não foi possível carregar os usuários.");
      }

      if (!Array.isArray(data)) {
        throw new Error(
          "A API não retornou uma lista de usuários. Confira a resposta de GET /users.",
        );
      }

      setUsers(data as User[]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao conectar com a API.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadUsers();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadUsers]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleEdit(user: User) {
    setForm({
      name: user.name,
      email: user.email,
      password: "",
    });

    setEditingId(user.id);
    setError("");
    setSuccess("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim() || !form.email.trim()) {
      setError("Nome e e-mail são obrigatórios.");
      return;
    }

    if (!editingId && form.password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    const payload: Record<string, string> = {
      name: form.name.trim(),
      email: form.email.trim(),
    };

    if (form.password) {
      payload.password = form.password;
    }

    if (!editingId) {
      payload.password = form.password;
    }

    setSaving(true);

    try {
      const response = await fetch(
        editingId ? `${API_URL}/users/${editingId}` : `${API_URL}/users`,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message || data?.error || "Não foi possível salvar o usuário.",
        );
      }

      setSuccess(
        editingId
          ? "Usuário atualizado com sucesso!"
          : "Usuário cadastrado com sucesso!",
      );

      resetForm();
      await loadUsers();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao salvar o usuário.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(user: User) {
    const confirmed = window.confirm(
      `Deseja realmente excluir o usuário ${user.name}?`,
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/users/${user.id}`, {
        method: "DELETE",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message || data?.error || "Não foi possível excluir o usuário.",
        );
      }

      if (editingId === user.id) {
        resetForm();
      }

      setSuccess("Usuário excluído com sucesso!");
      await loadUsers();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao excluir o usuário.",
      );
    }
  }

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <span className="eyebrow">MONOREPO BASE</span>
          <h1>Gerenciamento de usuários</h1>
          <p>Cadastre, consulte, edite e remova usuários.</p>
        </div>

        <button
          className="button button-secondary"
          type="button"
          onClick={() => void loadUsers()}
          disabled={loading}
        >
          {loading ? "Atualizando..." : "Atualizar lista"}
        </button>
      </header>

      {error && (
        <div className="alert alert-error" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success" role="status">
          {success}
        </div>
      )}

      <section className="content-grid">
        <div className="panel form-panel">
          <div className="panel-heading">
            <div>
              <span className="section-label">
                {editingId ? "EDIÇÃO" : "NOVO CADASTRO"}
              </span>

              <h2>{editingId ? "Editar usuário" : "Cadastrar usuário"}</h2>
            </div>

            {editingId && (
              <button className="text-button" type="button" onClick={resetForm}>
                Cancelar edição
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nome completo</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Digite o nome"
              value={form.name}
              onChange={handleChange}
              minLength={3}
              required
            />

            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="usuario@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">
              Senha
              {editingId && (
                <span className="label-hint">
                  Deixe em branco para não alterar
                </span>
              )}
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder={
                editingId ? "Nova senha (opcional)" : "Mínimo de 6 caracteres"
              }
              value={form.password}
              onChange={handleChange}
              minLength={editingId ? undefined : 6}
              required={!editingId}
              autoComplete="new-password"
            />

            <button
              className="button button-primary submit-button"
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Salvando..."
                : editingId
                  ? "Salvar alterações"
                  : "Cadastrar usuário"}
            </button>
          </form>
        </div>

        <div className="panel list-panel">
          <div className="panel-heading">
            <div>
              <span className="section-label">CADASTROS</span>
              <h2>Usuários cadastrados</h2>
            </div>

            <span className="count-badge">{users.length}</span>
          </div>

          {loading ? (
            <div className="empty-state">Carregando usuários...</div>
          ) : users.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">◎</span>
              <h3>Nenhum usuário encontrado</h3>
              <p>Cadastre o primeiro usuário pelo formulário.</p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Usuário</th>
                    <th>Perfil</th>
                    <th className="actions-heading">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-cell">
                          <div className="avatar">
                            {user.name.charAt(0).toUpperCase()}
                          </div>

                          <div className="user-info">
                            <strong>{user.name}</strong>
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span
                          className={`role-badge ${
                            user.role === "ADMIN" ? "role-admin" : "role-user"
                          }`}
                        >
                          {user.role || "USER"}
                        </span>
                      </td>

                      <td>
                        <div className="row-actions">
                          <button
                            className="button button-edit"
                            type="button"
                            onClick={() => handleEdit(user)}
                            aria-label={`Editar ${user.name}`}
                          >
                            Editar
                          </button>

                          <button
                            className="button button-delete"
                            type="button"
                            onClick={() => void handleDelete(user)}
                            aria-label={`Excluir ${user.name}`}
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <footer className="page-footer">
        React + TypeScript <span>•</span> Express API <span>•</span> Prisma
      </footer>
    </main>
  );
}

export default App;
