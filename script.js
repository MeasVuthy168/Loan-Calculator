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
    if (isNaN(loanAmount)) {
        // **Calculate Loan Amount**
        if (isNaN(periodicRepayment) || isNaN(term)) {
            alert("ដើម្បី គណនា ទំហំឥណទាន៖ បញ្ចូល ប្រាក់ សំណង ខួប និង រយៈពេល ខ្ចី (គិត ជា ខែ)");
            return;
        }
        if (paymentMethod === "Annuity") {
            loanAmount = periodicRepayment * (1 - Math.pow(1 + monthlyRate, -term)) / monthlyRate;
        } else {
            loanAmount = periodicRepayment * term / (1 + (monthlyRate * (term - 1) / 2));
        }
    } else if (isNaN(periodicRepayment)) {
        // **Calculate Periodic Repayment**
        if (isNaN(loanAmount) || isNaN(term)) {
            alert("ដើម្បី គណនាប្រាក់ សំណង ខួប៖ បញ្ចូល ទំហំ ឥណទាន និង រយៈពេល ខ្ចី (គិត ជា ខែ)");
            return;
        }
        if (paymentMethod === "Annuity") {
            periodicRepayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
        } else {
            let principalPayment = loanAmount / term;
            periodicRepayment = principalPayment + (loanAmount * monthlyRate); // First payment
        }
    } else if (isNaN(term)) {
        // **Calculate Loan Term**
        if (isNaN(loanAmount) || isNaN(periodicRepayment)) {
            alert("ដើម្បី គណនា រយៈពេល ខ្ចី៖ បញ្ចូល ទំហំឥណទាន និង ប្រាក់ សំណង ខួប");
            return;
        }
        term = Math.log(periodicRepayment / (periodicRepayment - loanAmount * monthlyRate)) / Math.log(1 + monthlyRate);
        term = Math.ceil(term);
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
