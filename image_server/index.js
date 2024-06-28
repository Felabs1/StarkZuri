const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// function to create a hashed filename
const createHashedFilename = (originalname) => {
  const hash = crypto
    .createHash("sha256")
    .update(originalname + Date.now())
    .digest("hex");
  return `${hash}${path.extname(originalname)}`;
};

// image upload and processing
app.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    const buffer = await sharp(req.file.buffer)
      .resize(800)
      .jpeg({ quality: 80 })
      .toBuffer();

    const filename = createHashedFilename(req.file.originalname);
    const outpath = path.join(__dirname, "uploads", filename);
    fs.writeFileSync(outpath, buffer);
    res.send("uploads/" + filename);
  } catch (error) {
    res.status(500).send("Error processing image");
    console.error(error);
  }
});

app.post("/upload-video", upload.single("video"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const filename = createHashedFilename(req.file.originalname);
    const tempPath = path.join(
      __dirname,
      "uploads",
      `${filename}_temp${path.extname(req.file.originalname)}`
    );
    const outputPath = path.join(__dirname, "uploads", filename);

    // Save the uploaded video temporarily
    fs.writeFileSync(tempPath, req.file.buffer);

    ffmpeg(tempPath)
      .output(outputPath)
      .videoCodec("libx264")
      .size("640x?") // Resize the video width to 640px, keeping aspect ratio
      .outputOptions("-crf 28") // Adjust the CRF for compression (lower value = higher quality)
      .on("end", () => {
        fs.unlinkSync(tempPath); // Remove the temporary file
        res.send("Video uploaded and compressed successfully.");
      })
      .on("error", (err) => {
        console.error(err);
        fs.unlinkSync(tempPath); // Remove the temporary file in case of error
        res.status(500).send("Error processing video.");
      })
      .run();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing video.");
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
