class TransactionService {
  constructor(transactions) {
    this.transactions = transactions;
  }

  getCategoryData() {
    const categoriesMap = {};
    for (const transaction of this.transactions) {
      if (!transaction.category) continue;
      if (!categoriesMap[transaction["category"]]) {
        categoriesMap[transaction["category"]] = {
          amount: transaction.amount,
          category: transaction.category,
          count: 1,
        };
      } else {
        const current = { ...categoriesMap[transaction["category"]] };
        categoriesMap[transaction["category"]] = {
          amount: Number(current.amount) + Number(transaction.amount),
          count: current.count + 1,
          category: current.category,
        };
      }
    }
    const incomes = [];
    const expenses = [];

    const all = Object.values(categoriesMap).sort(
      (a, b) => Math.abs(b.amount) - Math.abs(a.amount)
    );
    for (const item of all) {
      if (item.amount > 0) incomes.push(item);
      else expenses.push(item);
    }
    return [incomes, expenses];
  }
}

export default TransactionService;
