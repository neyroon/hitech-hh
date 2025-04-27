export const formatPrice = (price: number) =>
  `${price
    .toString()
    .split("")
    .reverse()
    .reduce(
      (acc, item, index) =>
        index + (1 % 3) === 0 ? acc.concat(`${item} `) : acc.concat(item),
      ""
    )} ₽`;
