import { convertedDate } from "../utils/convertDateType";

// Function to calculate the total money for the current month based on the type of transaction
export const TotalMoneyForCurrentMonth = (sortedValues, type) => {
    // Get the current month and year
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Filter transactions for the current month and year, and of the specified type
    const totalExpense = sortedValues
        .filter((transaction) => {
            const transactionDate = convertedDate(transaction.date);
            return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear && transaction.type === type;
        })
        // Sum up the amounts of the filtered transactions
        .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

    // Return the total expense for the current month
    return totalExpense;
};
