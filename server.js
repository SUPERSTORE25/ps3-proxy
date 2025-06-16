const express = require("express");
const app = express();

app.get("*", (req, res) => {
  const url = req.url;
  if (url.includes("ps3-updatelist.txt")) {
    // Redireciona a requisição da Sony para o arquivo hospedado
    res.redirect("https://update.superstoregames.com/ps3/list/ps3-updatelist.txt");
  } else {
    // Qualquer outra coisa, apenas bloqueia ou responde erro
    res.status(404).send("Arquivo não encontrado.");
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor proxy rodando na porta ${PORT}`);
});
