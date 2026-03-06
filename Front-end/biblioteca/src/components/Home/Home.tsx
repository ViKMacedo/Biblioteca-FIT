import "./Home.css";
import { BookCard } from "../BookCard/BookCard";
import { Details } from "../Details/Details";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { NewBook } from "../NewBook/NewBook";

export function Home() {
  const [busca, setBusca] = useState("");
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [livros, setLivros] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [livroSelecionado, setLivroSelecionado] = useState(null);

  async function buscarLivros() {
    try {
      const resposta = await api.get("/livros");
      console.log("Livros vindos do banco:", resposta.data);
      setLivros(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      alert("Erro ao conectar com o servidor!");
    } finally {
      setCarregando(false);
    }
  }

  function handleRemove(id: string | number) {
    setLivros((prevLivros) =>
      prevLivros.filter((livro: any) => livro.id !== id),
    );
    setLivroSelecionado(null);
  }

  function handleAtualizarLivro(livroAtualizado: any) {
    const listaNova = livros.map((l: any) =>
      l.id === livroAtualizado.id ? livroAtualizado : l,
    );
    setLivros(listaNova);
    setLivroSelecionado(livroAtualizado);
  }

  useEffect(() => {
    buscarLivros();
  }, []);
  const livrosFiltrados = livros.filter((livro) =>
    livro.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div className="container">
      <header className="header">
        <div className="header-top">
          <h1 className="titulo">Livros</h1>
          <button className="btn-novo" onClick={() => setMostrarCadastro(true)}>
            Novo
          </button>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </header>

      {carregando ? (
        <p>Carregando acervo...</p>
      ) : (
        <div className="lista-grid">
          {livrosFiltrados.map((item: any) => (
            <div
              key={item.id}
              onClick={() => setLivroSelecionado(item)}
              style={{ cursor: "pointer" }}
            >
              <BookCard
                livro={item}
                onDelete={async (e: any) => {
                  e.stopPropagation(); // Não deixa abrir o Detalhes

                  if (window.confirm(`Deseja excluir "${item.nome}"?`)) {
                    try {
                      console.log("Enviando DELETE para a API...");
                      await api.delete(`/livros/${item.id}`);
                      handleRemove(item.id); // Só remove da tela se a API confirmar
                    } catch (error) {
                      console.error("Erro na API:", error);
                      alert(
                        "O Back-end não deixou excluir. Verifique o servidor!",
                      );
                    }
                  }
                }}
              />
            </div>
          ))}
        </div>
      )}

      {!carregando && livros.length === 0 && (
        <p>Nenhum livro encontrado no banco de dados.</p>
      )}

      {livroSelecionado && (
        <Details
          livro={livroSelecionado}
          aoFechar={() => setLivroSelecionado(null)}
          aoExcluir={handleRemove} // <--- Use a nova função aqui
          aoAtualizar={handleAtualizarLivro}
        />
      )}
      {mostrarCadastro && (
        <NewBook
          aoFechar={() => setMostrarCadastro(false)}
          aoAdicionar={(novo: any) => setLivros([novo, ...livros])} // Coloca o novo no topo da lista!
        />
      )}
    </div>
  );
}
