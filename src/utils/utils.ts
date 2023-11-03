export const currencyConverter = (money: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(money);
};

export const emailConverter = (email: string) => {
  let emailArray = email.split("@");
  let censoredUserName =
    emailArray[0].substring(0, 2) + emailArray[0].slice(3).replace(/./g, "*");

  emailArray[0] = censoredUserName;

  return emailArray.join("@");
};
