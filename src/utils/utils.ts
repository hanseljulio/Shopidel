export const currencyConverter = (money: number): string => {
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
