window.onload = function() {
    displayTransactions();
    updateBudgetOverview();
};

function displayTransactions() {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let table = document.getElementById("summaryTable"); // Ensure you have a table with this ID

    // Clear existing rows before adding new ones
    table.innerHTML = `<tr>
        <th>Date</th>
        <th>Tag</th>
        <th>Amount</th>
    </tr>`;

    transactions.forEach(transaction => {
        let row = table.insertRow();
        let dateCell = row.insertCell(0);
        let tagCell = row.insertCell(1);
        let amountCell = row.insertCell(2);

        dateCell.innerText = transaction.date;
        tagCell.innerText = transaction.tag;
        amountCell.innerText = formatCurrency(transaction.amount);
    });
}

function updateBudgetOverview() {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);

    let income = parseFloat(localStorage.getItem("monthlyIncome")) || 0;
    document.getElementById("incomeValue").innerText = formatCurrency(income);
    document.getElementById("totalSpent").innerText = formatCurrency(totalSpent);
    
    let remaining = income - totalSpent;
    document.getElementById("remainingBudget").innerText = formatCurrency(remaining);
    document.getElementById("remainingBudget").className = remaining < 0 ? "warning" : "";
}

function formatCurrency(amount) {
    let currency = document.getElementById("currency").value || "USD";
    let symbols = {"USD": "$", "EUR": "€", "GBP": "£", "INR": "₹", "JPY": "¥", "CAD": "C$", "AUD": "A$"};
    return `${symbols[currency] || ""}${amount.toFixed(2)}`;
}
