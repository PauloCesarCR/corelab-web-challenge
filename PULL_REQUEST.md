# Como executar a aplicação ( Executará um compose com front e back).

- Clone o repositório publico que está no link abaixo.

- https://github.com/PauloCesarCR/TODO_APP_DOCKER_COMPOSE

- Certifique de adicionar o --recursive para trazer os submodules

- git clone https://github.com/PauloCesarCR/TODO_APP_DOCKER_COMPOSE -- recursive

- Abra na raiz do repo um cmd e execute o seguinte comando.

- docker compose up -d --build

- Após o build, e os containers subirem.

- Abra o localhost:3001 para acessar a aplicação.

## Funcionalidades Front-End

- Adiciona, exclui e edita tarefa.
- Lógica para bater pouco no servidor.
- Searching por titulo da tarefa

## Para adicionar uma tarefa

- Digite o titulo e a descrição e de Enter.

## Para Editar uma tarefa

- Clique em editar e os inputs serão liberados, digite o titulo e a descrição e de Enter.

## Para excluir

- Apenas clique no X do Card.
