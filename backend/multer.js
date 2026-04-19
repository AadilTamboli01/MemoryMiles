// import multer from "multer"

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // folder name
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

import multer from "multer"

const storage = multer.memoryStorage() // ✅ bas yahi karo

const upload = multer({ storage })

export default upload;