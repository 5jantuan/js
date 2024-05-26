let transactions = [];
let transactionId = 0;

/**
 * Adds a new transaction from the form inputs.
 */
function addTransaction() {
    const date = document.getElementById('date').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    if (!date || !amount || !category || !description) {
        alert('All fields are required.');
        return;
    }

    const transaction = {
        id: transactionId++,
        date: date,
        amount: amount,
        category: category,
        description: description
    };

    transactions.push(transaction);
    addTransactionToTable(transaction);
    calculateTotal();
    document.getElementById('transactionForm').reset();
}

/**
 * Adds a transaction to the table.
 * @param {Object} transaction - The transaction object to add to the table.
 */
function addTransactionToTable(transaction) {
    const table = document.getElementById('transactionTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.description.split(' ').slice(0, 4).join(' ')}</td>
        <td><button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button></td>
    `;

    newRow.className = transaction.amount > 0 ? 'green' : 'red';

    newRow.addEventListener('click', () => displayTransactionDetails(transaction));
}

/**
 * Deletes a transaction by its ID.
 * @param {number} id - The ID of the transaction to delete.
 */
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    const table = document.getElementById('transactionTable').getElementsByTagName('tbody')[0];
    for (let i = 0; i < table.rows.length; i++) {
        if (table.rows[i].cells[0].innerText == id) {
            table.deleteRow(i);
            break;
        }
    }
    calculateTotal();
}

/**
 * Calculates and displays the total amount of all transactions.
 */
function calculateTotal() {
    const totalAmount = transactions.reduce((total, transaction) => total + transaction.amount, 0);
    document.getElementById('totalAmount').innerText = `Total Amount: ${totalAmount}`;
}

/**
 * Displays the full details of a transaction.
 * @param {Object} transaction - The transaction object whose details are to be displayed.
 */
function displayTransactionDetails(transaction) {
    const detailsDiv = document.getElementById('transactionDetails');
    detailsDiv.innerHTML = `
        <p>ID: ${transaction.id}</p>
        <p>Date and Time: ${transaction.date}</p>
        <p>Amount: ${transaction.amount}</p>
        <p>Category: ${transaction.category}</p>
        <p>Description: ${transaction.description}</p>
    `;
    detailsDiv.style.display = 'block';
}
