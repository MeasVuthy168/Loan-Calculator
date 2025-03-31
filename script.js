function calculateLoan() {
    let loanAmount = parseFloat(document.getElementById("loanAmount").value);
    let periodicRepayment = parseFloat(document.getElementById("periodicRepayment").value);
    let term = parseFloat(document.getElementById("term").value);
    let interestRate = parseFloat(document.getElementById("interestRate").value);
    let repaymentPeriod = document.getElementById("repaymentPeriod").value;
    let paymentMethod = document.getElementById("paymentMethod").value;

    let periodsPerYear = repaymentPeriod === "Monthly" ? 12 : repaymentPeriod === "Quarterly" ? 4 : 1;
    let monthlyRate = (interestRate / 100) / periodsPerYear;
    
    // If loan amount is missing, calculate it
    if (isNaN(loanAmount)) {
        if (isNaN(periodicRepayment) || isNaN(term)) {
            alert("សូមបំពេញព័ត៌មានគ្រប់គ្រាន់ដើម្បីគណនាចំនួនឥណទាន!");
            return;
        }
        loanAmount = (periodicRepayment * (1 - Math.pow(1 + monthlyRate, -term))) / monthlyRate;
        document.getElementById("result-loanAmount").textContent = loanAmount.toFixed(2);
    }

    // If periodic repayment is missing, calculate it
    if (isNaN(periodicRepayment)) {
        if (isNaN(loanAmount) || isNaN(term)) {
            alert("សូមបំពេញព័ត៌មានគ្រប់គ្រាន់ដើម្បីគណនាការបង់ប្រាក់!");
            return;
        }
        periodicRepayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
        document.getElementById("result-periodicRepayment").textContent = periodicRepayment.toFixed(2);
    }

    // If term is missing, calculate it
    if (isNaN(term)) {
        if (isNaN(loanAmount) || isNaN(periodicRepayment)) {
            alert("សូមបំពេញព័ត៌មានគ្រប់គ្រាន់ដើម្បីគណនារយៈពេល!");
            return;
        }
        term = Math.log(periodicRepayment / (periodicRepayment - loanAmount * monthlyRate)) / Math.log(1 + monthlyRate);
        document.getElementById("result-term").textContent = Math.ceil(term);
    }

    // Calculate total interest paid
    let totalPayment = periodicRepayment * term;
    let totalInterest = totalPayment - loanAmount;
    document.getElementById("result-totalInterest").textContent = totalInterest.toFixed(2);
}
