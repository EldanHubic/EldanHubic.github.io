import express from "express";
import dotenv from "dotenv";
import konektajDB from "./config/db.js";
import colors from "colors";
import proizvodiRuta from "./route/proizvodiRuta.js";
import korisniciRuta from "./route/korisniciRuta.js";
import narudzbaRuta from "./route/narudzbaRuta.js";
import uploadRuta from "./route/uploadRuta.js";
import {
  nijePronadjen,
  errorHandler,
} from "./middleware/errorMiddlewareHandler.js";
import path from "path";

dotenv.config();
konektajDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/proizvodi", proizvodiRuta);
app.use("/api/korisnici", korisniciRuta);
app.use("/api/narudzbe", narudzbaRuta);
app.use("/api/upload", uploadRuta);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_KLIJENT_ID);
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

//MIDDLEWARE
app.use(nijePronadjen);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server je pokrenut na ${process.env.NODE_ENV}u i radi na portu ${PORT}`
      .green.underline
  );
});
