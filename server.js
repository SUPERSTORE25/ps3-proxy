const express = require("express");
const app = express();

app.get("*", (req, res) => {
  const url = req.url;
  if (url.includes("ps3-updatelist.txt")) {
    // Redireciona para o arquivo hospedado via HTTP
    res.redirect("http://update.superstoregames.com/PS3/list/ps3-updatelist.txt");
  } else {
    res.status(404).send("Arquivo não encontrado.");
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Servidor proxy rodando na porta ${PORT}`);
});
