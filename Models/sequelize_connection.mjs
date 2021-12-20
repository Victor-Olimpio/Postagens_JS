import nodeSequelize from 'sequelize';

const sequelizeNode = new nodeSequelize('cadastrarpost', 'victor', '123456', {
    host:       'localhost',
    dialect:    'mysql'
});

sequelizeNode.authenticate().then(() => {
    console.log('Conexão bem Sucedida!');
}).catch((error) => {
    console.log('Falha na Conexão!');
    console.log(error);
});

export default {
    nodeSequelize,
    sequelizeNode
};