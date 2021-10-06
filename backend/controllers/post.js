const db = require("../database_connect");

//test 
exports.test = (req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' }); 
}

// All post
exports.getAllPost = (req, res, next) => {
  db.query('SELECT * FROM posts', (error, result) => {
      if (error) {
          return res.status(400).json({
              message: 'erreur!'
          });
      }
      return res.status(200).json(result);
  });
};
// NewPost
exports.newPost = (req, res, next) => {
    let imageUrl = '';
    if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
    else {
        imageUrl = req.body.media;
    }
    // console.log(imageUrl);
    // console.log(req.file);
    // console.log(req.body);
    
    db.query(`INSERT INTO posts VALUES (NULL, '${req.body.id_user}', '${req.body.titre}', '${req.body.texte}', 
      '${imageUrl}')`, (error, result, field) => {
      if (error) {
          return res.status(400).json({
            error
          });
      }
      return res.status(201).json({
          message: 'Votre post à été publié !'
      })
  });
};
// OnePost
exports.getOnePost = (req, res, next) => {
  db.query(`SELECT * FROM posts INNER JOIN users ON posts.id_user = users.id WHERE id_post = ${req.params.id}`, (error, result, field) => {
    // SELECT users.id, users.username, comments.id,comments.texte, comments.id_user FROM users INNER JOIN comments ON users.id = comments.id_user WHERE comments.id_post = ${req.params.id}   
    if (error) {
          return res.status(400).json({
              error
          });
      }
      return res.status(200).json(result);
  });
};
// Delete OnePost
exports.deleteOnePost = (req, res, next) => {
  db.query(`DELETE FROM posts WHERE id_post = ${req.params.id}`, (error, result, field) => {
      if (error) {
          return res.status(400).json({
              error
          });
      }
      return res.status(200).json(result);
  });
};
// Modify OnePost
exports.modifyOnePost = (req, res, next) => {
  db.query(`UPDATE posts SET title = '${req.body.title}', content = '${req.body.content}' WHERE posts.id = ${req.params.id}`, (error, result, field) => {
      if (error) {
          return res.status(400).json({
              error
          });
      }
      return res.status(200).json(result);
  });
};
// Get User's Posts
exports.getUserPosts = (req, res, next) => {
  db.query(`SELECT * FROM posts WHERE posts.userId = ${req.params.id}`, (error, result, field) => {
      if (error) {
          return res.status(400).json({
              error
          });
      }
      return res.status(200).json(result);
  });
};
// New comment
exports.newComment = (req, res, next) => {
  db.query(`INSERT INTO comments VALUES (NULL, '${req.body.id_user}', '${req.body.texte}', '${req.params.id}')`, (error, result, field) => {
      if (error) {
          return res.status(400).json({
              error
          });
      }
      return res.status(200).json(result);
  });
};
// Get all comments
exports.getAllComments = (req, res, next) => {
  db.query(`SELECT users.id, users.username, comments.id,comments.texte, comments.id_user FROM users INNER JOIN comments ON users.id = comments.id_user WHERE comments.id_post = ${req.params.id} `,
      (error, result, field) => {
          if (error) {
              return res.status(400).json({
                  error
              });
          }
          return res.status(200).json(result);
      });
};
//Delete comment
exports.deleteComment = (req, res, next) => {
  db.query(`DELETE FROM comments WHERE comments.id = ${req.params.id}`, (error, result, field) => {
      if (error) {
          return res.status(400).json({
              error
          });
      }
      return res.status(200).json(result);
  });
};