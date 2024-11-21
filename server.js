const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post("/bfhl", (req, res) => {
  const { data, file_b64 } = req.body;

  // Validation
  if (!data || !Array.isArray(data)) {
    return res
      .status(400)
      .json({ is_success: false, message: "Invalid input" });
  }

  // Separate numbers and alphabets
  const numbers = data.filter((item) => /^\d+$/.test(item));
  const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
  const highestLowercase = alphabets
    .filter((item) => /^[a-z]$/.test(item))
    .sort()
    .pop();

  // Check for prime numbers
  const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };
  const isPrimeFound = numbers.some((num) => isPrime(Number(num)));

  // File handling
  let fileValid = false,
    fileMimeType = null,
    fileSizeKB = null;
  if (file_b64) {
    try {
      const buffer = Buffer.from(file_b64, "base64");
      fileValid = true; // Add actual validation logic
      fileMimeType = "image/png"; // Replace with actual MIME type detection
      fileSizeKB = (buffer.length / 1024).toFixed(2);
    } catch (error) {
      fileValid = false;
    }
  }

  // Response
  res.json({
    is_success: true,
    user_id: "yashpatil12102002",
    email: "yashpatil210175@acropolis.in",
    roll_number: "0827CS211264",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    is_prime_found: isPrimeFound,
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKB,
  });
});

app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
