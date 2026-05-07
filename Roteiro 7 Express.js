const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


let produtos = [];


function validarProduto(nome, preco) {

    if (!nome || nome.trim() === '') {
        return 'Nome é obrigatório';
    }

    if (typeof preco !== 'number' || preco <= 0) {
        return 'Preço inválido';
    }

    return null;
}


app.post('/produtos', (req, res) => {

    const { nome, preco } = req.body;

    const erro = validarProduto(nome, preco);

    if (erro) {
        return res.status(400).json({
            sucesso: false,
            erro: erro
        });
    }

    const produto = {
        id: produtos.length + 1,
        nome,
        preco
    };

    produtos.push(produto);

    return res.status(201).json({
        sucesso: true,
        dados: produto
    });
});


app.get('/produtos', (req, res) => {

    return res.json({
        sucesso: true,
        dados: produtos
    });
});


app.get('/produtos/:id', (req, res) => {

    const id = parseInt(req.params.id);


    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'ID inválido'
        });
    }

    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).json({
            sucesso: false,
            erro: 'Produto não encontrado'
        });
    }

    return res.json({
        sucesso: true,
        dados: produto
    });
});


app.put('/produtos/:id', (req, res) => {

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'ID inválido'
        });
    }

    const { nome, preco } = req.body;

    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).json({
            sucesso: false,
            erro: 'Produto não encontrado'
        });
    }

    const erro = validarProduto(nome, preco);

    if (erro) {
        return res.status(400).json({
            sucesso: false,
            erro: erro
        });
    }

    produto.nome = nome;
    produto.preco = preco;

    return res.json({
        sucesso: true,
        dados: produto
    });
});


app.delete('/produtos/:id', (req, res) => {

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'ID inválido'
        });
    }

    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            sucesso: false,
            erro: 'Produto não encontrado'
        });
    }

    produtos.splice(index, 1);

    return res.json({
        sucesso: true,
        dados: 'Produto removido com sucesso'
    });
});


app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});