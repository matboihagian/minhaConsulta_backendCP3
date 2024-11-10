const db = require('../db/database');

// Função para obter todas as consultas
exports.getConsultations = (req, res) => {
  db.all(`SELECT * FROM consultations`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Função para criar uma nova consulta
exports.createConsultation = (req, res) => {
  const { userId, date, doctor, specialty, status } = req.body;

  if (!userId || !date || !doctor || !specialty || !status) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  db.run(
    `INSERT INTO consultations (userId, date, doctor, specialty, status) VALUES (?, ?, ?, ?, ?)`,
    [userId, date, doctor, specialty, status],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, message: 'Consulta criada com sucesso!' });
    }
  );
};
