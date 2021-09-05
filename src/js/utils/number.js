export const formatNumberWithThousandSeparator = (number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
