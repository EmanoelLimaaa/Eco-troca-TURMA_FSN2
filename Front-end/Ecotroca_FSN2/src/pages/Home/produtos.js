import bicicletaImg from '../../assets/imagensdaHome/bicicletademontanha.jpg';
import livroImg from '../../assets/imagensdaHome/Livro-Senhordosaneis.webp';
import cameraImg from '../../assets/imagensdaHome/cameraDSLR.jpg';
import mesaImg from '../../assets/imagensdaHome/mesadejantar.jpg';
import sofaImg from '../../assets/imagensdaHome/sofa2lugares.jpg';
import guitarraImg from '../../assets/imagensdaHome/guitarra-eletrica.jpg';

const produtos = [
  {
    id: 1,
    nome: "Bicicleta de montanha",
    categoria: "Esportes",
    cidade: "São Paulo",
    descricao: "Bicicleta de montanha em excelente estado, usada poucas vezes.",
    imagem: bicicletaImg
  },
  {
    id: 2,
    nome: "Livro de O Senhor dos Anéis",
    categoria: "Livros",
    cidade: "Rio de Janeiro",
    descricao: "Coleção completa do Senhor dos Anéis em ótimo estado.",
    imagem: livroImg
  },
  {
    id: 3,
    nome: "Câmera DSLR",
    categoria: "Eletrônicos",
    cidade: "Belo Horizonte",
    descricao: "Câmera DSLR Canon, lente 18-55mm, funciona perfeitamente.",
    imagem: cameraImg
  },
  {
    id: 4,
    nome: "Mesa de jantar",
    categoria: "Móveis",
    cidade: "Curitiba",
    descricao: "Mesa de jantar de madeira para 6 pessoas.",
    imagem: mesaImg
  },
  {
    id: 5,
    nome: "Sofá de dois lugares",
    categoria: "Móveis",
    cidade: "Porto Alegre",
    descricao: "Sofá confortável, tecido bege, pouco uso.",
    imagem: sofaImg
  },
  {
    id: 6,
    nome: "Guitarra elétrica",
    categoria: "Instrumentos Musicais",
    cidade: "Salvador",
    descricao: "Guitarra elétrica em ótimo estado, acompanha case.",
    imagem: guitarraImg
  },
];

export default produtos;
