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
    return Object.values(categoriesMap).sort(
      (a, b) => Math.abs(b.amount) - Math.abs(a.amount)
    );
  }
}

export default TransactionService;
