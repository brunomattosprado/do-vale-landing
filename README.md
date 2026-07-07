# Do Vale Online Poker Clube — Landing Page

Landing page estática para compra de fichas via Pix com envio de comprovante pelo WhatsApp.

## Arquivos

```text
do-vale-github/
├── index.html
├── style.css
├── script.js
├── .nojekyll
└── assets/
    └── do-vale-logo.jpeg
```

## Dados já configurados

- Chave Pix: `51998123718`
- WhatsApp do operador: `5551998123718`
- Nome do clube: `Do Vale Online Poker Clube`

O WhatsApp do operador está usando o mesmo número da chave Pix. Caso precise trocar, edite esta linha no arquivo `script.js`:

```js
const OPERATOR_WHATSAPP = "5551998123718";
```

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos deste pacote para a raiz do repositório.
3. Entre em `Settings` > `Pages`.
4. Em `Build and deployment`, selecione:
   - `Source`: Deploy from a branch
   - `Branch`: main
   - `Folder`: /root
5. Clique em `Save`.

O GitHub vai gerar um link parecido com:

```text
https://seuusuario.github.io/nome-do-repositorio/
```

## Fluxo de uso

1. Cliente escolhe o valor das fichas.
2. Cliente informa nome completo e WhatsApp.
3. Cliente copia a chave Pix.
4. Cliente realiza o Pix no aplicativo do banco.
5. Cliente clica em `Já paguei, enviar comprovante no WhatsApp`.
6. O WhatsApp abre com mensagem pronta.
7. Cliente anexa o comprovante.
8. Operador confere o pagamento e adiciona os créditos manualmente.

## Importante

Esta versão não possui backend, banco de dados ou confirmação automática de Pix. A liberação dos créditos deve ser feita manualmente pelo operador após conferir o pagamento.

## Próxima etapa

Adicionar futuramente uma nova seção de folders dos torneios e criar botões específicos por evento.

## Atualização

A seção "Próximos torneios" foi removida nesta versão.
