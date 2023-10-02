const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");

  response.statusCode = 200;
  const { method } = request;
  if (method === "GET") {
    response.end("<h1>Hello ini GET</h1>");
  }

  if (method === "POST") {
    let body = [];
    request.on("data", (chunk) => {
      body.push(chunk);
    });
    // response.end("<h1>Hello ini POST</h1>");
    request.on("end", () => {
      body = Buffer.concat(body).toString();
      response.end(`<h1>Hai, ${body}</h1>`);
    });
  }
};

const server = http.createServer(requestListener);
const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
