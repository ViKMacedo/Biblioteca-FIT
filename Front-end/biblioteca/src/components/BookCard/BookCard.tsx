import "./BookCard.css";

export function BookCard({ livro }: any) {
  return (
    <div className="book-card">
      <div className="book-card-image">
        <img
          src={
            livro.imagemUrl ||
            "https://via.placeholder.com/150x220?text=Sem+Capa"
          }
          alt={livro.nome}
        />
      </div>

      <div className="book-card-info">
        <div className="book-card-header">
          <h3>{livro.nome}</h3>
        </div>

        <p className="book-card-author">Por {livro.autor}</p>
        <p className="book-card-description">
          {livro.descricao || "Nenhuma descrição informada."}
        </p>
      </div>
    </div>
  );
}
