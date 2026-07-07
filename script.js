// ====================================================== 
// CONFIGURAÇÕES DO CLUBE
// ======================================================

// Chave Pix informada pelo administrador do clube.
const PIX_KEY = "51998123718";

// WhatsApp que receberá os comprovantes.
// Por enquanto, usei o mesmo número informado como chave Pix.
// Caso o operador use outro número, altere somente esta linha.
const OPERATOR_WHATSAPP = "5551998123718";

const CLUB_NAME = "Do Vale Online Poker Clube";


// ======================================================
// ELEMENTOS DA PÁGINA
// ======================================================

const valueButtons = document.querySelectorAll(".value-btn");
const customValueInput = document.getElementById("customValue");
const selectedValueText = document.getElementById("selectedValue");
const pixKeyBox = document.getElementById("pixKey");
const copyPixBtn = document.getElementById("copyPixBtn");
const sendProofBtn = document.getElementById("sendProofBtn");

const clientNameInput = document.getElementById("clientName");
const clientPhoneInput = document.getElementById("clientPhone");
const clubIdInput = document.getElementById("clubId");

let selectedValue = null;

pixKeyBox.textContent = PIX_KEY;


// ======================================================
// SELEÇÃO DE VALORES
// ======================================================

valueButtons.forEach((button) => {
  button.addEventListener("click", () => {
    valueButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");
    selectedValue = Number(button.dataset.value);
    customValueInput.value = "";

    updateSelectedValue();
  });
});

customValueInput.addEventListener("input", () => {
  valueButtons.forEach((btn) => btn.classList.remove("active"));

  const value = Number(customValueInput.value);
  selectedValue = value > 0 ? value : null;

  updateSelectedValue();
});

function updateSelectedValue() {
  if (!selectedValue) {
    selectedValueText.textContent = "Nenhum valor selecionado";
    return;
  }

  selectedValueText.textContent = selectedValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}


// ======================================================
// COPIAR CHAVE PIX
// ======================================================

copyPixBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(PIX_KEY);
    alert("Chave Pix copiada com sucesso.");
  } catch (error) {
    alert("Não foi possível copiar automaticamente. Copie a chave Pix manualmente.");
  }
});


// ======================================================
// ENVIAR COMPROVANTE PELO WHATSAPP
// ======================================================

sendProofBtn.addEventListener("click", () => {
  const clientName = clientNameInput.value.trim();
  const clientPhone = clientPhoneInput.value.trim();
  const clubId = clubIdInput.value.trim();

  if (!selectedValue) {
    alert("Escolha um valor antes de continuar.");
    return;
  }

  if (!clientName) {
    alert("Informe seu nome completo.");
    return;
  }

  if (!clientPhone) {
    alert("Informe seu WhatsApp.");
    return;
  }

  if (!clubId) {
    alert("Informe sua identificação no clube.");
    return;
  }

  const formattedValue = selectedValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  const message =
    `Olá, realizei um Pix para compra de fichas/créditos no ${CLUB_NAME}.\n\n` +
    `Nome: ${clientName}\n` +
    `WhatsApp: ${clientPhone}\n` +
    `Identificação no clube: ${clubId}\n` +
    `Valor: ${formattedValue}\n` +
    `Chave Pix utilizada: ${PIX_KEY}\n\n` +
    `Vou anexar o comprovante nesta conversa para conferência.`;

  const whatsappUrl = `https://wa.me/${OPERATOR_WHATSAPP}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});
