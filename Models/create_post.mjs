import sequelize_connection from "./sequelize_connection.mjs";

const Post = sequelize_connection.sequelizeNode.define('postagens', {
    titulo: {
        type: sequelize_connection.nodeSequelize.STRING
    },
    conteudo: {
        type: sequelize_connection.nodeSequelize.TEXT
    }
});

Post.sync({force: false});

export default Post;