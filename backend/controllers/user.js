const bcrypt = require('bcrypt');  //hashage
const jwt = require('jsonwebtoken');
const db = require("../database_connect");
require('dotenv').config();

//Inscription
exports.signup = (req, res, next) => {
  //Verification email disponible
  db.query(`SELECT * FROM users WHERE email='${req.body.email}'`,
          (err, results) => {
              //Si email deja utilisé
              if (results.length > 0) {
                  res.status(401).json({
                      message: 'Email non disponible.'
                  });
                  //Si email disponible
              } else {
              //Cryptage du MDP
              bcrypt.hash(req.body.password, 10)
              .then(cryptedPassword => {
                  //Ajout à la BDD
                  db.query(`INSERT INTO users VALUES (NULL, '${req.body.username}', '${req.body.email}', '${cryptedPassword}', '${req.body.is_admin}')`,
                      (err, results, fields) => {
                          if (err) {
                            //   console.log(req.body);
                              console.log(err);
                              return res.status(400).json("erreur!");
                          }
                          return res.status(201).json({
                              message: 'Votre compte a bien été crée !'
                          });
                      }
                  );
              })
              .catch(error => res.status(500).json({
                  error
              }));
          }
          });
};

//Connexion
exports.login = (req, res, next) => {
  //Recherche de l'utilisateur dans la BDD
  console.log(req.body.email);
  db.query(`SELECT * FROM users WHERE email='${req.body.email}'`,
      (err, result, rows) => {
          //Si utilisateur trouvé : 
        //   console.log(result[0].password);

          if (result.length > 0) {
              //Verification du MDP
              bcrypt.compare(req.body.password, result[0].password)
                  .then(valid => {
                      //Si MDP invalide erreur
                      if (!valid) {
                          res.status(401).json({
                              message: 'Mot de passe incorrect.'
                          });
                          //Si MDP valide création d'un token
                      } else {
                          res.status(200).json({
                              id: result[0].id,
                              username: result[0].username,
                              email: result[0].email,
                              is_admin: result[0].is_admin,
                              token: jwt.sign({
                                  userId: result[0].id
                              }, 'RANDOM_TOKEN_SECRET', {
                                  expiresIn: '24h'
                              })
                          });
                      }
                  });
          } else {
              res.status(404).json({
                  message: 'Utilisateur inconnu.'
              });
          }
      }
  );
};

// Delete User
exports.deleteUser = (req, res, next) => {
  db.query(`DELETE FROM users WHERE id = ${req.params.id}`, (error, result, field) => {
      if (error) {
          return res.status(400).json({
              error
          });
      }
      return res.status(200).json(result);
  });
};