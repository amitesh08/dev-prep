const height = document.getElementById("height-input");
const weight = document.getElementById("weight-input");

const calculate = document.getElementById("calculate");
const result = document.getElementById("result");

calculate.addEventListener("click", () => {
  const hValue = height.value;
  const wValue = weight.value;

  if (!wValue || !hValue || wValue <= 0 || hValue <= 0) {
    result.textContent = "Please enter valid values.";
    return;
  }
  const bmi = wValue / (hValue / 100) ** 2;
  console.log("bmi is " + bmi);

  const category = bmiCategory(bmi);
  result.textContent = `BMI is ${bmi.toFixed(2)} (${category}).`;
});

function bmiCategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  else if (bmi < 24.9) return "Normal weight";
  else if (bmi < 29.9) return "Overweight";
  else return "Obese";
}
