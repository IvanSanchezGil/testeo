const getDB = require("../../getDB");

const deletePostQuery = async (idPost) => {
  let connection;

  try {
    connection = await getDB();

    // Eliminamos el post.
    await connection.query(`DELETE FROM post WHERE id = ?`, [idPost]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deletePostQuery;
