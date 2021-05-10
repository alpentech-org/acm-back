exports.getAdjustmentContexts = (req, res, next) => {
  res.status(201).json(["Pièce de Réglage", "Contexte inexistant", "Ebauche", "Ébauche"]);
};
