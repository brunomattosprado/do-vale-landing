// ===============================
// CONFIGURAÇÕES PRINCIPAIS
// ===============================

const PIX_KEY = "51998123718";

// Número que receberá o comprovante no WhatsApp.
// Formato: 55 + DDD + número, sem espaços, sem traços e sem +.
const OPERATOR_WHATSAPP = "5551998123718";

const CLUB_NAME = "Do Vale Online Poker Clube";

// ===============================
// ELEMENTOS DA PÁGINA
// ===============================

const valueButtons = document.querySelectorAll(".value-btn");
const customValueInput = document.getElementById("customValue");
const selectedValueText = document.getElementById("selectedValue");
const pixKeyText = document.getElementById("pixKey");
const copyPixBtn = document.getElementById("copyPixBtn");
const sendProofBtn = document.getElementById("sendProofBtn");
const clientNameInput = document.getElementById("clientName");
const clientPhoneInput = document.getElementById("clientPhone");
const yearText = document.getElementById("year");

let selectedValue = 100;

// ===============================
// INICIALIZAÇÃO
// ===============================

pixKeyText.textContent = PIX_KEY;
yearText.textContent = new Date().getFullYear();
updateSelectedValue();

// ===============================
// SELEÇÃO DO VALOR
// ===============================

valueButtons.forEach((button) => {
  button.addEventListener("click", () => {
    valueButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    customValueInput.value = "";

    selectedValue = Number(button.dataset.value);
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

// ===============================
// COPIAR PIX
// ===============================

copyPixBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(PIX_KEY);
    showCopySuccess();
  } catch (error) {
    fallbackCopyPix();
  }
});

function fallbackCopyPix() {
  const textarea = document.createElement("textarea");
  textarea.value = PIX_KEY;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  showCopySuccess();
}

function showCopySuccess() {
  const originalText = copyPixBtn.textContent;
  copyPixBtn.textContent = "Pix copiado";

  setTimeout(() => {
    copyPixBtn.textContent = originalText;
  }, 1800);
}

// ===============================
// ENVIAR COMPROVANTE PELO WHATSAPP
// ===============================

sendProofBtn.addEventListener("click", () => {
  const clientName = clientNameInput.value.trim();
  const clientPhone = clientPhoneInput.value.trim();

  if (!selectedValue || selectedValue <= 0) {
    alert("Escolha ou digite o valor das fichas antes de continuar.");
    return;
  }

  if (!clientName) {
    alert("Informe seu nome completo.");
    clientNameInput.focus();
    return;
  }

  if (!isValidBrazilianPhone(clientPhone)) {
    alert("Informe um WhatsApp válido com DDD. Exemplo: 51999999999.");
    clientPhoneInput.focus();
    return;
  }

  const formattedValue = selectedValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  const message = [
    `Olá! Realizei um Pix para compra de fichas no ${CLUB_NAME}.`,
    "",
    `Nome: ${clientName}`,
    `WhatsApp: ${clientPhone}`,
    `Valor: ${formattedValue}`,
    "",
    "Vou anexar o comprovante do Pix nesta conversa para conferência."
  ].join("\n");

  const whatsappUrl = `https://wa.me/${OPERATOR_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

function isValidBrazilianPhone(phone) {
  const onlyNumbers = phone.replace(/\D/g, "");
  return onlyNumbers.length >= 10 && onlyNumbers.length <= 11;
}
