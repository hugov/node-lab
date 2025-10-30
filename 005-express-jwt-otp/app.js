const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

const app = express();
app.use(express.json());

let storedOtp = "";

// Registro com JWT
app.post("/register", async (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const link = `https://seusite.com/activate?token=${token}`;
  console.log(`Clique no link para ativar: <a href="${link}">${link}</a>`);

  res.json({ message: `E-mail de ativação enviado. Token: ${token}` });
});

// Confirmação com JWT
app.get("/activate", (req, res) => {
  const { token } = req.query;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Aqui você marca o usuário como ativo no banco de dados
    res.send("Conta ativada com sucesso!");
  } catch {
    res.status(400).send("Token inválido ou expirado");
  }
});

// Registro com OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  storedOtp = otp;

  res.json({ message: `Seu código é: ${otp}` });
});

// Confirmação com OTP
app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (storedOtp === otp) {
    res.json({ message: "Usuário confirmado com sucesso!" });
  } else {
    res.status(400).json({ message: "Código inválido ou expirado." });
  }
});

app.listen(3000);
