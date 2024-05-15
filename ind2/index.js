

/**
 * Класс, представляющий отдельную транзакцию.
 */
class Transaction {
    /**
     * Создает новую транзакцию.
     * @param {string} transaction_id Уникальный идентификатор транзакции.
     * @param {string} transaction_date Дата транзакции в формате 'YYYY-MM-DD'.
     * @param {number} transaction_amount Сумма транзакции.
     * @param {string} transaction_type Тип транзакции (debit или credit).
     * @param {string} transaction_description Описание транзакции.
     * @param {string} merchant_name Название торговой точки или компании.
     * @param {string} card_type Тип карты (например, Visa, MasterCard).
     */
    constructor(transaction_id, transaction_date, transaction_amount,
                transaction_type, transaction_description, merchant_name, card_type) {
        this.transaction_id = transaction_id;
        this.transaction_date = transaction_date;
        this.transaction_amount = transaction_amount;
        this.transaction_type = transaction_type;
        this.transaction_description = transaction_description;
        this.merchant_name = merchant_name;
        this.card_type = card_type;
    }

    /**
     * Возвращает строковое представление транзакции в формате JSON.
     * @returns {string} Строковое представление транзакции.
     */
    string() {
        return JSON.stringify(this);
    }
}

/**
 * Класс для анализа данных о транзакциях.
 */
class TransactionAnalyzer {
    /**
     * Создает новый анализатор транзакций.
     * @param {Transaction[]} transactions Массив транзакций.
     */
    constructor(transactions = []) {
        this.transactions = transactions;
    }


    /**
     * Возвращает массив уникальных типов транзакций.
     * @returns {string[]} Массив типов транзакций.
     */
    getUniqueTransactionType() {
        const types = new Set();
        this.transactions.forEach(transaction => types.add(transaction.transaction_type));
        return Array.from(types);
    }

    /**
     * Рассчитывает общую сумму всех транзакций.
     * @returns {number} Общая сумма транзакций.
     */
    calculateTotalAmount() {
        return this.transactions.reduce((total, transaction) => total + parseFloat(transaction.transaction_amount), 0);
    }

    /**
     * Вычисляет общую сумму транзакций за указанный год, месяц и день.
     * @param {number} [year] Год.
     * @param {number} [month] Месяц (от 1 до 12).
     * @param {number} [day] День месяца.
     * @returns {number} Общая сумма транзакций за указанный период.
     */
    calculateTotalAmountByDate(year, month, day) {
        let total = 0;
        this.transactions.forEach(transaction => {
            const dateParts = transaction.transaction_date.split('-').map(Number);
            if ((!year || dateParts[0] === year) &&
                (!month || dateParts[1] === month) &&
                (!day || dateParts[2] === day)) {
                total += parseFloat(transaction.transaction_amount);
            }
        });
        return total;
    }
 /**
     * Возвращает транзакции указанного типа (debit или credit).
     * @param {string} type Тип транзакции (debit или credit).
     * @returns {Transaction[]} Массив транзакций указанного типа.
     */
    getTransactionByType(type) {
        return this.transactions.filter(transaction => transaction.transaction_type === type);
    }

    /**
     * Возвращает транзакции, проведенные в указанном диапазоне дат от startDate до endDate.
     * @param {string} startDate Начальная дата в формате 'YYYY-MM-DD'.
     * @param {string} endDate Конечная дата в формате 'YYYY-MM-DD'.
     * @returns {Transaction[]} Массив транзакций в указанном диапазоне дат.
     */
    getTransactionsInDateRange(startDate, endDate) {
        return this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.transaction_date);
            return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
        });
    }

    /**
     * Возвращает транзакции, совершенные с указанным торговым местом или компанией.
     * @param {string} merchantName Название торговой точки или компании.
     * @returns {Transaction[]} Массив транзакций с указанным торговым местом или компанией.
     */
    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(transaction => transaction.merchant_name === merchantName);
    }

    /**
     * Возвращает среднее значение транзакций.
     * @returns {number} Среднее значение транзакций.
     */
    calculateAverageTransactionAmount() {
        if (this.transactions.length === 0) return 0;
        const totalAmount = this.transactions.reduce((total, transaction) => total + parseFloat(transaction.transaction_amount), 0);
        return totalAmount / this.transactions.length;
    }

    /**
     * Возвращает транзакции с суммой в заданном диапазоне от minAmount до maxAmount.
     * @param {number} minAmount Минимальная сумма транзакции.
     * @param {number} maxAmount Максимальная сумма транзакции.
     * @returns {Transaction[]} Массив транзакций в указанном диапазоне сумм.
     */
    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.transactions.filter(transaction => {
            const amount = parseFloat(transaction.transaction_amount);
            return amount >= minAmount && amount <= maxAmount;
        });
    }
     /**
     * Вычисляет общую сумму дебетовых транзакций.
     * @returns {number} Общая сумма дебетовых транзакций.
     */
     calculateTotalDebitAmount() {
        const totalDebitAmount = this.transactions.reduce((total, transaction) => {
            if (transaction.transaction_type === 'debit') {
                total += parseFloat(transaction.transaction_amount);
            }
            return total;
        }, 0);
        return totalDebitAmount;
    }

    /**
     * Возвращает месяц, в котором было больше всего транзакций.
     * @returns {string} Название месяца.
     */
    findMostTransactionsMonth() {
        const months = {};
        this.transactions.forEach(transaction => {
            const month = transaction.transaction_date.split('-')[1];
            if (!months[month]) {
                months[month] = 1;
            } else {
                months[month]++;
            }
        });
        const mostTransactionsMonth = Object.keys(months).reduce((a, b) => months[a] > months[b] ? a : b);
        return mostTransactionsMonth;
    }

    /**
     * Возвращает месяц, в котором было больше дебетовых транзакций.
     * @returns {string} Название месяца.
     */
    findMostDebitTransactionMonth() {
        const debitTransactionsByMonth = {};
        this.transactions.forEach(transaction => {
            const month = transaction.transaction_date.split('-')[1];
            if (transaction.transaction_type === 'debit') {
                if (!debitTransactionsByMonth[month]) {
                    debitTransactionsByMonth[month] = 1;
                } else {
                    debitTransactionsByMonth[month]++;
                }
            }
        });
        const mostDebitMonth = Object.keys(debitTransactionsByMonth).reduce((a, b) => debitTransactionsByMonth[a] > debitTransactionsByMonth[b] ? a : b);
        return mostDebitMonth;
    }

    /**
     * Возвращает наиболее часто встречающийся тип транзакции (debit, credit, или equal).
     * @returns {string} Наиболее часто встречающийся тип транзакции.
     */
    mostTransactionTypes() {
        const typesCount = {
            debit: 0,
            credit: 0
        };
        this.transactions.forEach(transaction => {
            typesCount[transaction.transaction_type]++;
        });
        if (typesCount.debit > typesCount.credit) {
            return 'debit';
        } else if (typesCount.credit > typesCount.debit) {
            return 'credit';
        } else {
            return 'equal';
        }
    }

    /**
     * Возвращает транзакции, совершенные до указанной даты.
     * @param {string} date Дата в формате 'YYYY-MM-DD'.
     * @returns {Transaction[]} Массив транзакций.
     */
    getTransactionsBeforeDate(date) {
        return this.transactions.filter(transaction => transaction.transaction_date < date);
    }

    /**
     * Возвращает транзакцию по ее уникальному идентификатору.
     * @param {string} id Уникальный идентификатор транзакции.
     * @returns {Transaction|null} Транзакция или null, если не найдено.
     */
    findTransactionById(id) {
        return this.transactions.find(transaction => transaction.transaction_id === id) || null;
    }

    /**
     * Возвращает новый массив, содержащий только описания транзакций.
     * @returns {string[]} Массив описаний транзакций.
     */
    mapTransactionDescriptions() {
        return this.transactions.map(transaction => transaction.transaction_description);
    }
}

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'transaction.json');
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
});

