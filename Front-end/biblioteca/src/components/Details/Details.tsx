import { useState } from "react";
import "./Details.css";
import { api } from "../../services/api";

export function Details({ livro, aoFechar, aoExcluir, aoAtualizar }: any) {
  if (!livro) return null;

  const [confirmarExclusao, setConfirmarExclusao] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    id: livro.id,
    nome: livro.nome,
    autor: livro.autor,
    publicado: livro.publicado || "",
    descricao: livro.descricao || "",
    imagemUrl: livro.imagemUrl || "",
  });

  async function handleConfirmarExclusao() {
    if (!livro?.id) return;
    try {
      await api.delete(`/livros/${livro.id}`);
      aoExcluir(livro.id);
      aoFechar();
    } catch (error) {
      alert("Não foi possível excluir o livro.");
    }
  }

  async function saveEdit() {
    try {
      const resposta = await api.put(`/livros/${livro.id}`, formData);
      aoAtualizar(resposta.data);
      setIsEditing(false);
    } catch (error) {
      alert("Erro ao atualizar.");
    }
  }

  return (
    <div className="modal-overlay" onClick={aoFechar}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {confirmarExclusao && (
          <div className="confirm-overlay">
            <div className="confirm-card">
              <h2>Tem certeza?</h2>
              <p>Ao excluir este livro não será possível recuperá-lo.</p>
              <div className="confirm-buttons">
                <button
                  className="btn-cancelar-conf"
                  onClick={() => setConfirmarExclusao(false)}
                >
                  Cancelar
                </button>
                <button
                  className="btn-excluir-conf"
                  onClick={handleConfirmarExclusao}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="col-texto">
          <div className="cabecalho-modal">
            <button className="btn-voltar" onClick={aoFechar}>
              &lt; Voltar
            </button>
            <div>
              {isEditing ? (
                <button onClick={saveEdit} className="btn-save-text">
                  Salvar
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-edit-text"
                >
                  Editar
                </button>
              )}
              <button
                className="btn-excluir-modal-trigger"
                onClick={() => setConfirmarExclusao(true)}
              >
                Excluir
              </button>
            </div>
          </div>

          {isEditing ? (
            <div className="form-edicao">
              <input
                type="text"
                className="input-edit-titulo"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
              />
              <input
                type="text"
                className="input-edit-autor"
                value={formData.autor}
                onChange={(e) =>
                  setFormData({ ...formData, autor: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="URL da Imagem"
                className="input-edit-autor"
                value={formData.imagemUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imagemUrl: e.target.value })
                }
              />
              <textarea
                className="textarea-edit-desc"
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
              />
            </div>
          ) : (
            <>
              <h1>{livro.nome}</h1>
              <p>
                <strong>Por {livro.autor}</strong>
              </p>
              <p style={{ marginBottom: "20px" }}>
                Publicado em {livro.publicado || "Data não informada"}
              </p>
              <div className="descricao">
                <p>{livro.descricao || "Sem descrição disponível."}</p>
              </div>
            </>
          )}
        </div>

        <div className="col-imagem">
          <img
            src={
              formData.imagemUrl ||
              "https://via.placeholder.com/300x450?text=Sem+Capa"
            }
            alt="Capa do livro"
          />
        </div>
      </div>
    </div>
  );
}
