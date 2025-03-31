function calculateLoan() {
    let amount = document.getElementById("amount").value;
    let rate = document.getElementById("rate").value;
    let term = document.getElementById("term").value;

    if (amount <= 0 || rate <= 0 || term <= 0) {
        alert("Please enter valid values!");
        return;
    }

    let monthlyRate = (rate / 100) / 12;
    let numberOfPayments = term * 12;

    let monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    let totalPayment = monthlyPayment * numberOfPayments;
    let totalInterest = totalPayment - amount;

    document.getElementById("monthly-payment").textContent = monthlyPayment.toFixed(2);
    document.getElementById("total-payment").textContent = totalPayment.toFixed(2);
    document.getElementById("total-interest").textContent = totalInterest.toFixed(2);
}
