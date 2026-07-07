# Do Vale Online Poker Clube - Landing Page de Compra de Fichas

Landing page estática para compra de fichas via Pix e envio de comprovante pelo WhatsApp.

## Arquivos

- `index.html`: estrutura da página
- `style.css`: visual baseado na identidade do clube
- `script.js`: lógica de seleção de valor, copiar Pix e envio para WhatsApp
- `assets/do-vale-logo.jpeg`: imagem base do clube

## Dados já configurados

- Chave Pix: `51998123718`
- WhatsApp do operador: `5551998123718`

Por enquanto, o WhatsApp do operador está usando o mesmo número da chave Pix. Caso seja diferente, altere a linha abaixo em `script.js`:

```js
const OPERATOR_WHATSAPP = "5551998123718";
```

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos deste pacote para a raiz do repositório.
3. Vá em `Settings` > `Pages`.
4. Em `Build and deployment`, selecione:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. Clique em `Save`.

## Fluxo operacional

1. Cliente escolhe o valor.
2. Cliente copia a chave Pix.
3. Cliente realiza o pagamento no banco.
4. Cliente clica em "Já paguei, enviar comprovante no WhatsApp".
5. WhatsApp abre com mensagem pronta.
6. Cliente anexa o comprovante.
7. Operador confere o Pix e adiciona os créditos manualmente.

## Próxima etapa futura

Adicionar uma seção de folders de torneios com botões específicos para compra de fichas por evento.
