const invoiceButtons = document.querySelectorAll("[data-invoice-state]");
const officialInvoiceViewer = document.querySelector("[data-invoice-viewer]");
const foundAmount = document.getElementById("found-amount");
const invoiceTotal = document.getElementById("invoice-total");
const totalLabel = document.getElementById("total-label");
const analysisStatus = document.getElementById("analysis-status");

function setInvoiceState(state) {
  const checked = state === "checked";

  invoiceButtons.forEach((button) => {
    const selected = button.dataset.invoiceState === state;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  officialInvoiceViewer.dataset.state = state;
  foundAmount.textContent = checked ? "AA.10.0020 × 3 · + CHF 29.23" : "Noch kein Hinweis";
  invoiceTotal.textContent = checked ? "CHF 286.40" : "CHF 257.17";
  totalLabel.textContent = checked ? "Nach ärztlicher Freigabe" : "Rechnungsbetrag im Entwurf";
  analysisStatus.textContent = checked ? "Zeitquelle und Dokumentation abgeglichen" : "Noch nicht geprüft";
  analysisStatus.classList.toggle("is-draft", !checked);
}

invoiceButtons.forEach((button) => {
  button.addEventListener("click", () => setInvoiceState(button.dataset.invoiceState));
});

const upliftSlider = document.getElementById("uplift-slider");
const upliftOutput = document.getElementById("uplift-output");
const upliftFormula = document.getElementById("uplift-formula");
const annualExtra = document.getElementById("annual-extra");
const annualCases = 6800;
const averageConsultation = 155;

function updateAnnualScenario() {
  const upliftPercent = Number(upliftSlider.value);
  const additionalVolume = Math.round(annualCases * averageConsultation * upliftPercent / 100);
  const percentageLabel = `${upliftPercent.toFixed(1).replace(".", ",")}%`;

  upliftOutput.textContent = percentageLabel;
  upliftFormula.textContent = percentageLabel;
  annualExtra.textContent = `≈ CHF ${additionalVolume.toLocaleString("de-CH")}`;
}

upliftSlider.addEventListener("input", updateAnnualScenario);
updateAnnualScenario();

document.getElementById("year").textContent = new Date().getFullYear();
