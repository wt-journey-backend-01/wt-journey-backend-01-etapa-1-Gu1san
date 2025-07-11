const express = require("express");

const app = express();
const PORT = 3000;
const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/contato", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contato.html"));
});

app.get("/sugestao", (req, res) => {
  const { nome, ingredientes } = req.query;
  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="UTF-8" /><title>Obrigado</title></head>
      <body>
        <h1>Obrigado pela sugestão, ${nome}!</h1>
        <p>Você sugeriu um lanche com os ingredientes: <strong>${ingredientes}</strong></p>
        <a href="/">Voltar</a>
      </body>
    </html>
  `;
  res.send(html);
});

app.post("/contato", (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;
  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="UTF-8" /><title>Obrigado</title></head>
      <body>
        <h1>Obrigado pela sugestão, ${nome}!</h1>
        <p>Recebemos a seguinte sugestão sobre <strong>${assunto}</strong>: ${mensagem}</p><br/>
        <p>Entraremos em contato pelo email: <strong>${email}</strong></p>
        <a href="/">Voltar</a>
      </body>
    </html>
  `;
  res.send(html);
});

app.get("/api/lanches", (req, res) => {
  const lanches = [
    {
      id: 1,
      nome: "DevBurger Clássico",
      ingredientes:
        "Pão brioche, Carne 150g, Queijo cheddar, Alface americana, Tomate fresco, Molho especial",
    },
    {
      id: 2,
      nome: "Burger de Bacon",
      ingredientes:
        "Pão australiano, Carne 180g, Queijo prato, Bacon crocante, Cebola caramelizada, Molho barbecue",
    },
    {
      id: 3,
      nome: "Commit Veggie",
      ingredientes:
        "Pão integral, Burger de grão de bico, Queijo vegano, Rúcula, Tomate seco, Maionese de ervas",
    },
  ];

  res.json(lanches);
});

app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});
