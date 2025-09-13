# Pizza Menu App

## Sobre o projeto

Este projeto é um aplicativo de menu de pizzas que permite aos usuários visualizar e selecionar diferentes tipos de pizzas, adicionar ao carrinho, e revisar suas escolhas antes de finalizar a compra. O repositório inclui uma lista JSON de pizzas e um script que gerencia a interação com o usuário, desde a escolha das pizzas até o gerenciamento do carrinho de compras.

### Estrutura do Projeto

O projeto está organizado nos seguintes diretórios e arquivos principais:

```plaintext
/
|-- js/
|   |-- pizzas.js       # Contains the pizza data in JSON format
|   |-- script.js       # Handles the application logic and UI interactions
|-- css/
|   |-- style.css       # Styling rules for the application
|-- index.html          # Main HTML file where the app runs
```

### Tecnologias Usadas

O projeto utiliza as seguintes tecnologias:

- **HTML5**: Para marcação da estrutura da página.
- **CSS3**: Para estilos e layout da interface de usuário.
- **JavaScript (ES6)**: Para a lógica de interação e manipulação do DOM.

## Dependências

O projeto não possui dependências externas e pode ser executado em qualquer navegador moderno que suporte JavaScript ES6.

## Instalação

Não é necessária instalação específica para executar o projeto. Basta clonar o repositório e abrir o arquivo `index.html` em um navegador moderno:

```bash
git clone https://github.com/seu-usuario/pizza-menu-app.git
cd pizza-menu-app
firefox index.html # ou outro navegador de sua escolha
```

## Como usar

### Executando o Projeto

Abra o arquivo `index.html` no navegador para ver o menu de pizzas. Você poderá selecionar diferentes pizzas, escolher tamanhos e quantidades, e adicionar ao carrinho. O carrinho pode ser revisado clicando no ícone do carrinho no canto direito da tela.

### Executando Testes

Atualmente, este projeto não inclui testes automatizados.

## Detalhes do Código

### `pizzas.js`

Representa uma lista de pizzas em um array de objetos `pizzaJson`. Cada objeto possui propriedades como `id`, `name`, `img`, `price`, `sizes` e `description`.

### `script.js`

Contém a lógica para:

- Carregar e exibir pizzas usando dados de `pizzas.js`.
- Manipular eventos do usuário para abrir e fechar modais, adicionar pizzas ao carrinho, e ajustar quantidades.
- Atualizar a interface do carrinho de compras conforme os itens são adicionados ou removidos.

## Exemplos de Uso

Veja as pizzas disponíveis, selecione o tamanho desejado e quantidade, e adicione ao carrinho. Revise seu carrinho e modifique quantidades ou remova itens conforme necessário antes de finalizar a compra.

## Contribuindo

1. **Fork** o repositório (https://github.com/seu-usuario/pizza-menu-app/fork)
2. Crie sua feature branch (`git checkout -b feature/fooBar`)
3. Commit suas mudanças (`git commit -am 'Add some fooBar'`)
4. Push para a branch (`git push origin feature/fooBar`)
5. Crie um novo Pull Request

### Boas Práticas

- Mantenha o código limpo e bem comentado.
- Siga as convenções de codificação do projeto.
- Teste suas mudanças localmente antes de enviar um pull request.
- Documente quaisquer mudanças importantes ou instruções de uso adicional no arquivo README.

## License

Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE.md para detalhes.