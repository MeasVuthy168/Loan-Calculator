function calculateLoan() {
    let loanAmount = parseFloat(document.getElementById("loanAmount").value);
    let term = parseFloat(document.getElementById("term").value);
    let interestRate = parseFloat(document.getElementById("interestRate").value);
    let repaymentPeriod = document.getElementById("repaymentPeriod").value;
    let paymentMethod = document.getElementById("paymentMethod").value;

    // Validate input
    if (isNaN(loanAmount) || isNaN(term) || isNaN(interestRate)) {
        alert("Please fill in Loan Amount, Term, and Interest Rate.");
        return;
    }

    // Determine the number of payments per year
    let periodsPerYear = repaymentPeriod === "Monthly" ? 12 : repaymentPeriod === "Quarterly" ? 4 : 1;
    let totalPayments = term; // Number of total payments
    let monthlyRate = (interestRate / 100) / periodsPerYear;

    let periodicRepayment;
    let totalInterest = 0;

    if (paymentMethod === "Annuity") {
        // **Annuity Formula**
        if (monthlyRate === 0) {
            periodicRepayment = loanAmount / totalPayments; // No interest case
        } else {
            periodicRepayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments));
        }
        totalInterest = (periodicRepayment * totalPayments) - loanAmount;
    } else if (paymentMethod === "Linear") {
        // **Linear (Equal Principal Payments)**
        let principalPayment = loanAmount / totalPayments;
        let remainingBalance = loanAmount;
        let totalPaid = 0;

        for (let i = 0; i < totalPayments; i++) {
            let interestPayment = remainingBalance * monthlyRate;
            let currentPayment = principalPayment + interestPayment;
            totalPaid += currentPayment;
            remainingBalance -= principalPayment;
        }

        periodicRepayment = principalPayment + (loanAmount * monthlyRate); // First payment (reduces over time)
        totalInterest = totalPaid - loanAmount;
    }

    // Update results
    document.getElementById("result-loanAmount").textContent = loanAmount.toFixed(2);
    document.getElementById("result-periodicRepayment").textContent = periodicRepayment.toFixed(2);
    document.getElementById("result-term").textContent = totalPayments;
    document.getElementById("result-totalInterest").textContent = totalInterest.toFixed(2);
}
