export const calculateExpectedBalance = (initialValue: number, date: string): number => {
    const startDate = new Date(date);
    const currentDate = new Date();
    const months = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + currentDate.getMonth() - startDate.getMonth();
    return initialValue * Math.pow(1.0052, months);
  };
  
  export const calculateTax = (balance: number, withdrawals: number[]): number => {
    // Implemente a lógica de cálculo de impostos
    return 0;
  };
  