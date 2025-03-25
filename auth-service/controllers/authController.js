const { User } = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password } = req.body;
    // Vous pouvez ajouter ici des validations supplémentaires

    const user = await User.create({ firstname, lastname, email, phone, password });
    res.status(201).json({ message: "Utilisateur créé avec succès", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Chercher l'utilisateur par email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Comparer le mot de passe fourni avec le hash stocké
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Générer un token JWT (valable par exemple 1h)
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: "Connexion réussie", user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
