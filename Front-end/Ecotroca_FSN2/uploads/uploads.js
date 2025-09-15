import multer from "multer";

// Configuração de onde salvar e o nome do arquivo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // pasta onde o arquivo será salvo
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // nome único
  }
});

// Criação do middleware de upload
const upload = multer({ storage });
export default upload;
