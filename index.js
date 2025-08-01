const fs = require("fs");
const http = require("http");
const result = require("./results.json");
const { loveAnalysis } = require("./analysis");
const PORT = 4000;

const writeData = (data) => {
  fs.writeFile(
    "./results.json",
    JSON.stringify(data, null, 2),
    "utf-8",
    (err) => {
      if (err) {
        console.log("Error writing to file", err);
      }
    }
  );
};

const writeText = (summary) => {
  fs.appendFile("./results.txt", summary + "\n\n", "utf-8", (err) => {
    if (err) {
      console.log("Error writing to text file", err);
    }
  });
};

const server = http.createServer((req, res) => {
  //POST Request
  if (req.method === "POST" && req.url.startsWith("/calculate")) {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        const { name1, name2 } = JSON.parse(body);
        const resultData = await loveAnalysis(name1, name2);
        result.push(resultData);
        writeData(result);

        // const data = JSON.parse(body);
        // const name1 = data.name1;
        // const name2 = data.name2;
        // const resultData = await loveAnalysis(name1, name2);
        // result.push(resultData);
        // writeData(result);

        const summary = `${name1} scored ${resultData.score1}%\n${name2} scored ${resultData.score2}%\nAverage: ${resultData.average}% - ${resultData.message}`;
        writeText(summary);

        res.writeHead(201, {
          "Content-Type": "application/json",
        });
        res.end(
          JSON.stringify({
            message: "Love Analysis Completed",
            data: resultData,
          })
        );
      } catch (err) {
        res.writeHead(400, {
          "Content-Type": "application/json",
        });
        res.end(
          JSON.stringify({
            message: "Invalid Request",
            error: err.message,
          })
        );
      }
    });
  } else {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.end("<h1>Welcome to Love Calculator App</h1>");
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
