const mortgageAmount = document.querySelector(".amount");
const mortgageTerm = document.querySelector(".second-input");
const interestRate = document.querySelector(".third-input");
const form = document.querySelector("form");
const radioSection = document.querySelector(".radio-section");
const monthAmount = document.querySelector(".payment-show h1");
const repayAmount = document.querySelector(".payment-show h3");

function validateForm() {
  const check = document.querySelector('input[name="type"]:checked');
  if (!check) {
    alert("Please enter a mortgage type");
    return false;
  }
  return true;
}

function getAmount(e) {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  let Amount = Number(mortgageAmount.value) || 0;
  let Term = Number(mortgageTerm.value) || 0;
  let rate = interestRate.value || 0;
  const n = Term * 12;
  const r = rate / 100 / 12;
  let p = Amount;
  // repayment section
  const monthly = (p * (r * (1 + r) ** n)) / ((1 + r) ** n - 1);
  const monthlyCalculation = monthly.toFixed(2);
  const total_repayment = (monthly * n).toFixed(2);

  // interest only
  const interest = p * r;
  const interestCalculation = interest.toFixed(2);
  const interest_total = (interest * n + p).toFixed(2);

  document.querySelector(".left-section").style.display = "none";
  document.querySelector(".section-complete").style.display = "block";

  const type = document.querySelector('input[name="type"]:checked').value || "";
  const check = document.querySelector('input[name="type"]:checked');
  if (check) {
    // console.log(check);
    document.querySelectorAll('input[name="type"]').forEach((radio) => {
      radio.parentElement.classList.remove("checked");
    });
    check.parentElement.classList.add("checked");
  }

  if (type === "repay") {
    console.log("The monthly pay is ", monthly);
    console.log("The total pay is ", total_repayment);
    monthAmount.textContent = `£${monthlyCalculation}`;
    repayAmount.textContent = `£${total_repayment}`;

  } else {
    console.log("The monthly pay is ", interestCalculation);
    console.log("The total pay is", interest_total);
    monthAmount.textContent = `£${interestCalculation}`;
    repayAmount.textContent = `£${interest_total} `;

  }
}

form.addEventListener("submit", getAmount);

