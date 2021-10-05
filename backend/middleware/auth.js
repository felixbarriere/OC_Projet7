const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log(req);


    const token = req.headers.authorization.split(' ')[1];      //on extrait le token du header "autorization" et on prend la partie située apres l'espace
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const id_user = decodedToken.id_user;
    console.log(token)

    if (req.body.id_user && req.body.id_user !== id_user) {    //si la demande contient un id, on le compare à celui extrait du token
      throw 'Mauvais ID utilisateur';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requete invalide!')
    });
  }
};