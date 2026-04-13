import multer from "multer"

const storage = multer.memoryStorage(); // local save nahi hoga

const upload = multer({ storage });

// module.exports = upload;
export default upload