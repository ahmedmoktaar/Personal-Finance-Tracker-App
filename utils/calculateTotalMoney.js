import { convertedDate } from "../utils/convertDateType";

export const TotalMoneyForCurrentMonth = (sortedValues, type) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const totalExpense = sortedValues
        .filter((transaction) => {
            const transactionDate = convertedDate(transaction.date);
            return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear && transaction.type === type;
        })
        .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

    return totalExpense;
};
