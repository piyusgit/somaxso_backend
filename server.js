const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const validationData = require("./validation");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Utility function to write data to CSV
const appendToCSV = (filePath, data, header = null) => {
  if (!fs.existsSync(filePath) && header) {
    fs.writeFileSync(filePath, header, "utf8");
  }
  fs.appendFileSync(filePath, data, "utf8");
};

// Form submission endpoint
app.post("/form_detail", (req, res) => {
  try {
    // Validate the input data
    const validationResult = validationData(req);
    if (validationResult) {
      return res
        .status(validationResult.status)
        .json({ message: validationResult.message });
    }

    const { firstname, lastname, email, phone, message } = req.body;

    // Define the file path and data format
    const filePath = "form-data.csv";
    const headerRow = `"First Name","Last Name","Email","Phone","Message"\n`;
    const csvRow = `"${firstname}","${lastname}","${email}","${phone}","${message}"\n`;

    // Write to CSV
    appendToCSV(filePath, csvRow, headerRow);

    res.status(200).json({ message: "Form data saved successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
