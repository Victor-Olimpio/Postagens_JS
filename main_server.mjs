//IMPORTAÇÕES E CONSTANTES
import nodeMoment from 'moment';
import nodePathFile from 'path';
import nodeExpress from 'express';
import nodeBodyParser from 'body-parser';
import Post from './Models/create_post.mjs';
import nodeHandlebars from 'express-handlebars';

const nodeApplication = nodeExpress();
const __dirname = nodePathFile.resolve();

//CARREGAR ARQUIVOS ESTÁTICOS
nodeApplication.use(nodeExpress.static('Views'));
nodeApplication.use('/Images', nodeExpress.static(__dirname + '/View/Images'));
nodeApplication.use('/Styles', nodeExpress.static(__dirname + '/View/Styles'));

//CONFIGURAÇÃO DO HANDLEBARS
nodeApplication.engine('handlebars', nodeHandlebars.engine({
    defaultLayout: 'Main',
    helpers: {
        formatDate: (date) => {
            return nodeMoment(date).format('DD/MM/YYYY - HH:mm');
        }
    }}));
nodeApplication.set('view engine', 'handlebars');

//CONFIGURAÇÃO DO BODY-PARSER
nodeApplication.use(nodeBodyParser.urlencoded({extended: false}));
nodeApplication.use(nodeBodyParser.json());

//CONFIGURAÇÃO DO SERVIDOR
const serverSettings = () => {
    //CONFIGURAÇÃO DAS ROTAS
    nodeApplication.get('/', (request, response) => {
        Post.findAll({order: [['id', 'DESC']]}).then((datesPost) => {
            response.render(__dirname + '/Views/home', {datesPost: datesPost});
        }); 
    });

    nodeApplication.get('/cadastrar', (request, response) => {
        response.render(__dirname + '/Views/register');
    });

    nodeApplication.get('/deletar/:id', (request, response) => {
        Post.destroy({where: {'id': request.params.id}}).then(() => {
            console.log('Postagem Deletada!');
            response.redirect('/');
        }).catch((error) => {
            console.log('Falha ao Deletar a Postagem!');
            console.log(error);
        });
    });

    nodeApplication.post('/adicionar-postagem', (request, response) => {
        Post.create({
            titulo:     request.body.titulo,
            conteudo:   request.body.conteudo
        }).then(() => {
            console.log('Postagem Cadastrada!');
            response.redirect('/');
        }).catch((error) => {
            console.log('Falha no Cadastro!');
            console.log(error);
        })
    });
};
serverSettings();

//LIGANDO NA PORTA 3000
nodeApplication.listen(3000, () => {console.log('Servidor Online!')});