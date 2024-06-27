const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

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
    res.send("image uploaded and compressed successfully");
  } catch (error) {
    res.status(500).send("Error processing image");
  }
});

app.post("/upload-video", upload.single("video"), (req, res) => {
  const filename = createHashedFilename(req.file.originalname);
  const outputPath = path.join(__dirname, "uploads", filename);
  const tempPath = path.join(
    __dirname,
    "uploads",
    `${filename}_temp${path.extname(req.file.originalname)}`
  );

  // save the uploaded video temporarily
  fs.writeFileSync(tempPath, req.file.buffer);

  ffmpeg(tempPath)
    .output(outputPath)
    .videoCodec("libx264")
    .size("640x?")
    .outputOptions("-crf 28")
    .on("end", () => {
      fs.unlinkSync(tempPath);
      res.send("video uploaded and compressed successfully");
    })
    .on("error", (err) => {
      fs.unlinkSync(tempPath);
      res.status(500).send("Error processing video");
    })
    .run();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
