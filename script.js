function calculateLoan() {
    let loanAmount = parseFloat(document.getElementById("loanAmount").value);
    let periodicRepayment = parseFloat(document.getElementById("periodicRepayment").value);
    let term = parseFloat(document.getElementById("term").value);
    let interestRate = parseFloat(document.getElementById("interestRate").value);
    let repaymentPeriod = document.getElementById("repaymentPeriod").value;
    let paymentMethod = document.getElementById("paymentMethod").value;

    // Determine the number of payments per year
    let periodsPerYear = repaymentPeriod === "Monthly" ? 12 : repaymentPeriod === "Quarterly" ? 4 : 1;
    let monthlyRate = (interestRate / 100) / periodsPerYear;

    // Ensure at least one value is missing
    let missingFields = [isNaN(loanAmount), isNaN(periodicRepayment), isNaN(term)].filter(Boolean).length;
    if (missingFields !== 1) {
        alert("សូមទុកប្រអប់ណាមួយ ដែលលោកអ្នកចង់គណនាឱ្យ នៅ ទទេ");
        return;
    }

    let totalInterest = 0;

    // **Calculate missing field**
    if (isNaN(term)) {
        // **Calculate Loan Term**
        if (isNaN(loanAmount) || isNaN(periodicRepayment)) {
            alert("ដើម្បី គណនា រយៈពេល ខ្ចី៖ បញ្ចូល ទំហំឥណទាន និង ប្រាក់ សំណង ខួប");
            return;
        }
        if (paymentMethod === "Annuity") {
            term = Math.log(periodicRepayment / (periodicRepayment - loanAmount * monthlyRate)) / Math.log(1 + monthlyRate);
            term = Math.ceil(term);
        } else {
            // **Linear Repayment: Solve for Term**
            let remainingBalance = loanAmount;
            let fixedPrincipalPayment = loanAmount / periodicRepayment; // Fixed principal portion
            let months = 0;

            while (remainingBalance > 0) {
                let interestPayment = remainingBalance * monthlyRate;
                let totalPayment = fixedPrincipalPayment + interestPayment;

                if (totalPayment > periodicRepayment) {
                    months++;  // Keep counting months
                    remainingBalance -= fixedPrincipalPayment; // Reduce balance
                } else {
                    break;
                }
            }
            term = months;
        }
    }

    // Calculate total interest paid
    let totalPayment = periodicRepayment * term;
    totalInterest = totalPayment - loanAmount;

    // Update results
    document.getElementById("result-loanAmount").textContent = loanAmount.toFixed(2);
    document.getElementById("result-periodicRepayment").textContent = periodicRepayment.toFixed(2);
    document.getElementById("result-term").textContent = term;
    document.getElementById("result-totalInterest").textContent = totalInterest.toFixed(2);
}
