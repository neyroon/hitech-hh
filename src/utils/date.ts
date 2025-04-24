export const convertDate = (date: Date) =>
  `${date.getDate()}.${
    date.getMonth() > 10 ? date.getMonth() : `0${date.getMonth()}`
  }.${date.getFullYear()}`;
