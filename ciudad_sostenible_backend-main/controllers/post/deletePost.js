const selectPostByQuery = require("../../db/queries/post/selectPostByIdQuery");
const deleteQuery = require("../../db/queries/post/deleteQuery"); // Cambia esta línea
const { generateError, deleteImg } = require("../../helpers");

const deletePost = async (req, res, next) => {
  try {
    const { idPost } = req.params;

    // Comprobamos si somos los dueños del post.
    const post = await selectPostByIdQuery(idPost);

    // También podríamos poner: !post.owner
    if (post.idUser !== req.user.id) {
      generateError("No tienes suficientes permisos", 401);
    }

    // Si el post tiene imagen la eliminamos de la carpeta de "uploads".
    if (post.image) {
      await deleteImg(post.image);
    }

    // Eliminamos el post.
    await deletePostQuery(idPost);

    res.send({
      status: "ok",
      message: "Post eliminado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deletePost;
