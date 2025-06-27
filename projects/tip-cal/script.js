const billAmountInput = document.getElementById("billAmount");
const tipPercentageInput = document.getElementById("tipPercentage");
const numPeopleInput = document.getElementById("numPeople");
const calculateButton = document.getElementById("calculateButton");
const totalTipDisplay = document.getElementById("totalTip");
const tipPerPersonDisplay = document.getElementById("tipPerPerson");

calculateButton.addEventListener("click", calculateTip);

function calculateTip() {
  const billAmount = parseFloat(billAmountInput.value);
  const tipPercentage = parseFloat(tipPercentageInput.value);
  const numPeople = parseInt(numPeopleInput.value);

  if (
    Number.isNaN(billAmount) ||
    Number.isNaN(tipPercentage) ||
    Number.isNaN(numPeople)
  ) {
    alert("please give only numbers");
    return;
  }

  const totalTip = (billAmount * tipPercentage) / 100;
  const tipPerPerson = totalTip / numPeople;

  totalTipDisplay.innerText = `Total Tip : ₹${totalTip.toFixed(2)}`;
  tipPerPersonDisplay.innerText = `Tip Per Person : ₹${tipPerPerson.toFixed(
    2
  )}`;
}
