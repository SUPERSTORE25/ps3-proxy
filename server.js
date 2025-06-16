const http = require("http");

const server = http.createServer((req, res) => {
  const fullPath = req.url;

  if (fullPath.includes("ps3-updatelist.txt")) {
    const redirectPath = "/PS3" + fullPath.replace(/^\/[^\/]+\.ps3\.update\.playstation\.net/, "");

    const options = {
      hostname: "update.superstoregames.com",
      port: 80,
      path: redirectPath,
      method: "GET"
    };

    const proxy = http.request(options, proxyRes => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    proxy.on("error", err => {
      console.error("Erro no proxy:", err);
      res.writeHead(502, { "Content-Type": "text/plain" });
      res.end("Erro ao redirecionar atualização do PS3.");
    });

    proxy.end();
  } else {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("Acesso negado: proxy PS3 ativo apenas para update.");
  }
});

const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
  console.log("Servidor proxy do PS3 está rodando na porta " + PORT);
});
