import { useState } from "react";
import { api } from "../../services/api";
import "./NewBook.css";

export function NewBook({ aoFechar, aoAdicionar }: any) {
  const [formData, setFormData] = useState({
    nome: "",
    autor: "",
    publicado: "",
    descricao: "",
    imagemUrl: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const resposta = await api.post("/livros", formData);
      aoAdicionar(resposta.data);
      aoFechar();
    } catch (error) {
      alert("Erro ao cadastrar livro.");
    }
  }

  return (
    <div className="modal-overlay" onClick={aoFechar}>
      <div
        className="modal-content-cadastro"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Novo livro</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-corpo">
            <div className="col-inputs">
              <input
                type="text"
                placeholder="Título"
                required
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Autor"
                required
                onChange={(e) =>
                  setFormData({ ...formData, autor: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Data de publicação"
                onChange={(e) =>
                  setFormData({ ...formData, publicado: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="URL da Imagem (Capa)"
                value={formData.imagemUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imagemUrl: e.target.value })
                }
              />
              <textarea
                placeholder="Descrição"
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
              />
            </div>

            <div className="col-upload">
              <div className="upload-placeholder">
                {formData.imagemUrl ? (
                  <img
                    src={formData.imagemUrl}
                    alt="Preview"
                    className="preview-img"
                  />
                ) : (
                  <>
                    <span className="icon-image">🖼️</span>
                    <p>Cole o link ao lado</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="form-acoes">
            <button type="button" className="btn-cancelar" onClick={aoFechar}>
              Cancelar
            </button>
            <button type="submit" className="btn-salvar-modal">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
