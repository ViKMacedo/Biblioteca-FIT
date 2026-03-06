import express, { request } from "express";
import { prisma } from "./lib/prisma.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/livros", async (req, res) => {
  const { nome, publicado, autor, descricao, imagemUrl } = req.body;

  const novoLivro = await prisma.livro.create({
    data: {
      nome,
      publicado,
      autor,
      descricao,
      imagemUrl,
    },
  });

  res.status(201).json(novoLivro);
});

app.put("/livros/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, autor, publicado, descricao, imagemUrl } = req.body;

  try {
    const livroAtualizado = await prisma.livro.update({
      where: { id: id },
      data: { nome, autor, publicado, descricao, imagemUrl },
    });

    res.json(livroAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro interno" });
  }
});

app.get("/livros", async (req, res) => {
  try {
    const livros = await prisma.livro.findMany();
    res.status(200).json(livros);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar livros" });
  }
});

app.delete("/livros/:id", async (req, res) => {
  const { id } = req.params;

  if (!id || id === "undefined" || id.length !== 24) {
    return res.status(400).json({ error: "ID inválido fornecido." });
  }

  try {
    await prisma.livro.delete({
      where: { id: id },
    });
    return res.status(200).json({ message: "Livro deletado!" });
  } catch (error) {
    console.error("Erro Prisma:", error.message);
    return res.status(404).json({ error: "Livro não encontrado." });
  }
});
app.listen(3000);

/* 
user: victor
senha:serverfit
*/
