export default function formatNumber(number: number) {
  // return a formatted number with commas
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
