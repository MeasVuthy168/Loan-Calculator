function calculateLoan() {
    let loanAmount = parseFloat(document.getElementById("loanAmount").value);
    let periodicRepayment = parseFloat(document.getElementById("periodicRepayment").value);
    let term = parseFloat(document.getElementById("term").value);
    let interestRate = parseFloat(document.getElementById("interestRate").value);
    let repaymentPeriod = document.getElementById("repaymentPeriod").value;
    let paymentMethod = document.getElementById("paymentMethod").value;

    // Define number of payments per year
    let periodsPerYear = repaymentPeriod === "Monthly" ? 12 : repaymentPeriod === "Quarterly" ? 4 : 1;
    let monthlyRate = (interestRate / 100) / periodsPerYear;

    // Validate: Only one field should be empty
    let missingFields = [isNaN(loanAmount), isNaN(periodicRepayment), isNaN(term)].filter(Boolean).length;
    if (missingFields !== 1) {
        alert("សូមទុកប្រអប់ណាមួយ ដែលលោកអ្នកចង់គណនាឱ្យ នៅ ទទេ");
        return;
    }

    let totalInterest = 0;

    // **Calculate the missing value**
    if (isNaN(loanAmount)) {
        if (isNaN(periodicRepayment) || isNaN(term)) {
            alert("បញ្ចូល ប្រាក់សំណងខួប និង រយៈពេលខ្ចី (គិតជា ខែ) ដើម្បីគណនា ទំហំឥណទាន");
            return;
        }
        if (paymentMethod === "Annuity") {
            loanAmount = periodicRepayment * (1 - Math.pow(1 + monthlyRate, -term)) / monthlyRate;
        } else {
            // Linear: Loan Amount Calculation using first repayment
            let principalPayment = periodicRepayment - (loanAmount * monthlyRate);
            loanAmount = principalPayment * term;
        }
    } else if (isNaN(periodicRepayment)) {
        if (isNaN(loanAmount) || isNaN(term)) {
            alert("បញ្ចូល ទំហំ ឥណទាន និង រយៈពេល ខ្ចី ដើម្បីគណនាប្រាក់សំណងខួប");
            return;
        }
        if (paymentMethod === "Annuity") {
            periodicRepayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));
        } else {
            // Linear: Calculate First Repayment
            let principalPayment = loanAmount / term;
            periodicRepayment = principalPayment + (loanAmount * monthlyRate); // First repayment
        }
    } else if (isNaN(term)) {
        if (isNaN(loanAmount) || isNaN(periodicRepayment)) {
            alert("បញ្ចូល ទំហំឥណទាន និង ប្រាក់សំណងខួប ដើម្បីគណនា រយៈពេលខ្ចី");
            return;
        }

        if (paymentMethod === "Annuity") {
            term = Math.log(periodicRepayment / (periodicRepayment - loanAmount * monthlyRate)) / Math.log(1 + monthlyRate);
            term = Math.ceil(term);
        } else {
            // **Linear Repayment: Find term iteratively**
            let remainingBalance = loanAmount;
            let months = 0;
            let fixedPrincipal = loanAmount / 100000; // Incremental step

            while (remainingBalance > 0) {
                let interestPayment = remainingBalance * monthlyRate;
                let principalPayment = periodicRepayment - interestPayment;

                if (principalPayment <= 0) {
                    alert("ការបង់សងមិនគ្រប់គ្រាន់ដើម្បីទ្រទ្រង់ការបង់ការប្រាក់!");
                    return;
                }

                remainingBalance -= principalPayment;
                months++;
            }

            term = months;
        }
    }

    // **Calculate total interest**
    let totalPayment = periodicRepayment * term;
    totalInterest = totalPayment - loanAmount;

    // **Display results**
    document.getElementById("result-loanAmount").textContent = loanAmount.toFixed(2);
    document.getElementById("result-periodicRepayment").textContent = periodicRepayment.toFixed(2);
    document.getElementById("result-term").textContent = term;
    document.getElementById("result-totalInterest").textContent = totalInterest.toFixed(2);
}
