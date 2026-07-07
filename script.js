// Configurações principais
const PIX_KEY = "51997123718";
const OPERATOR_WHATSAPP = "5551997123718";
const CLUB_NAME = "Do Vale Online Poker Clube";

const valueButtons = document.querySelectorAll(".value-btn");
const customValueInput = document.getElementById("customValue");
const selectedValueText = document.getElementById("selectedValue");
const copyPixBtn = document.getElementById("copyPixBtn");
const sendProofBtn = document.getElementById("sendProofBtn");
const clientNameInput = document.getElementById("clientName");
const clientPhoneInput = document.getElementById("clientPhone");
const yearEl = document.getElementById("year");

let selectedValue = 100;

if (yearEl) yearEl.textContent = new Date().getFullYear();

function formatBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

function updateSelectedValue() {
  selectedValueText.textContent = selectedValue ? formatBRL(selectedValue) : "Nenhum valor selecionado";
}

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

copyPixBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(PIX_KEY);
    const original = copyPixBtn.textContent;
    copyPixBtn.textContent = "Pix copiado";
    setTimeout(() => { copyPixBtn.textContent = original; }, 1800);
  } catch (error) {
    alert("Não foi possível copiar automaticamente. Copie a chave manualmente: " + PIX_KEY);
  }
});

sendProofBtn.addEventListener("click", () => {
  const clientName = clientNameInput.value.trim();
  const clientPhone = clientPhoneInput.value.trim();

  if (!selectedValue) {
    alert("Escolha um valor antes de continuar.");
    return;
  }

  if (!clientName) {
    alert("Informe seu nome completo.");
    clientNameInput.focus();
    return;
  }

  if (!clientPhone) {
    alert("Informe seu WhatsApp.");
    clientPhoneInput.focus();
    return;
  }

  const formattedValue = formatBRL(selectedValue);

  const message =
    `Olá, realizei um Pix para compra de fichas/créditos no ${CLUB_NAME}.%0A%0A` +
    `Nome: ${encodeURIComponent(clientName)}%0A` +
    `WhatsApp: ${encodeURIComponent(clientPhone)}%0A` +
    `Valor: ${encodeURIComponent(formattedValue)}%0A%0A` +
    `Vou anexar o comprovante nesta conversa para conferência manual.`;

  const whatsappUrl = `https://wa.me/${OPERATOR_WHATSAPP}?text=${message}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

updateSelectedValue();
