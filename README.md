# 📚 Sistema de Gestão de Livros (Full-Stack)

Esta é uma aplicação completa para gestão de uma biblioteca pessoal, construída com uma arquitetura moderna baseada em microserviços contentorizados. O projeto separa claramente as responsabilidades entre interface e persistência de dados.

## 🏗️ Arquitetura do Sistema

O projeto está dividido em três serviços principais orquestrados pelo **Docker**:

1.  **Front-end**: Desenvolvido em **React (Vite)**, servido por um servidor **Nginx**.
2.  **Back-end**: API REST construída com **Node.js (Express)** utilizando **ES Modules**.
3.  **Dadabase**: **MongoDB**, um banco NoSQL escalável e flexível.

## 🚀 Tecnologias Utilizadas

### Porquê MongoDB & Prisma?
* **MongoDB**: Escolhido pela sua flexibilidade de esquema. Como os atributos de um livro podem variar (edições, autores múltiplos, metadados), o modelo de documentos do MongoDB é ideal.
* **Prisma ORM**: Utilizado como ponte entre o Node.js e o MongoDB. Proporciona **Type Safety** (segurança de tipos) e facilita a escrita de queries complexas através de métodos JavaScript intuitivos, eliminando a necessidade de escrever queries manuais.

## 🛠️ Como Executar o Projeto

### Pré-requisitos
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e funcionando.

### Passo a Passo
1.  **Clonar o repositório:**
    ```bash
    git clone (https://github.com/ViKMacedo/Biblioteca-FIT.git)
    cd Biblioteca-FIT
    ```

2.  **Configurar Variáveis de Ambiente:**
    Cria um ficheiro `.env` dentro da pasta `Back-end` com a tua string de conexão (o Docker já configura isto automaticamente no compose, mas o Prisma necessita para comandos locais):
    ```env
    DATABASE_URL="mongodb://admin:password@mongodb:27017/livros?authSource=admin"
    ```

3.  **Subir os Contentores:**
    Na raiz do projeto, executa:
    ```bash
    docker compose up --build
    ```

4.  **Aceder à Aplicação:**
    * **Interface (Front-end):** [http://localhost](http://localhost)
    * **API (Back-end):** [http://localhost:3000](http://localhost:3000)

## 🔧 Comandos Úteis

* **Gerar Cliente Prisma**: Caso alteres o `schema.prisma`:
    ```bash
    docker compose exec livraria-back npx prisma generate
    ```
* **Explorar os Dados (Prisma Studio)**: Para ver os dados do MongoDB numa interface visual:
    ```bash
    docker compose exec livraria-back npx prisma studio
    ```
