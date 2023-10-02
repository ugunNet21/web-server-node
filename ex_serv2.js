const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");

  //   response.statusCode = 200;
  //   response.end();
  const { method, url } = request;

  if (url === "/") {
    if (method === "GET") {
      response.statusCode = 200;
      response.end("<h1>ini adalah home page</h1>");
    } else {
      response.statusCode = 400;
      response.end(
        `<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`
      );
    }
  } else if (url === "/about") {
    if (method === "GET") {
      response.statusCode = 200;
      response.end("<h1>Halo, ini adalah halaman about</h1>");
    } else if (method === "POST") {
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });
      // response.end("<h1>Hello ini POST</h1>");
      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.statusCode = 200;
        response.end(`<h1>Halo, ${name} ini adalah halaman about</h1>`);
      });
    } else {
      response.statusCode = 400;
      response.end(`<h1>Halaman tidak dapat diakses ${method} request</h1>`);
    }
  } else {
    response.statusCode = 404;
    response.end("<h1>Halaman tidak ditemukan</h1>");
  }
};

const server = http.createServer(requestListener);
const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});

// curl -X POST -H "Content-Type: application/json" http://localhost:5000 -d "{\"name\": \"Dicoding\"}"
