const express = require("express");

const app = express();
const PORT = 3000;
const path = require("path");

app.use(express.urlencoded({ extended: true }));

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

app.listen(PORT, () => {
  console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});
