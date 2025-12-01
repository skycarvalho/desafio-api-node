import users from "../../data/users.json" assert { type: "json" };

class UserController {
  static getAll(req, res) {
    res.json(users);
  }

  static getById(req, res) {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    res.json(user);
  }

  static create(req, res) {
    const newUser = {
      id: users.length + 1,
      ...req.body
    };

    users.push(newUser);

    res.status(201).json(newUser);
  }

  static update(req, res) {
    const id = Number(req.params.id);
    const index = users.findIndex(u => u.id === id);

    if (index === -1)
      return res.status(404).json({ message: "Usuário não encontrado" });

    users[index] = { id, ...req.body };

    res.json(users[index]);
  }

  static delete(req, res) {
    const id = Number(req.params.id);
    const index = users.findIndex(u => u.id === id);

    if (index === -1)
      return res.status(404).json({ message: "Usuário não encontrado" });

    users.splice(index, 1);

    res.json({ message: "Usuário removido" });
  }
}

export default UserController;
