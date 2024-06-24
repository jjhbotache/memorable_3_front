export default function numberVerifier(number: string) {
  if (number === '') {
    return false;
  }
  if (isNaN(Number(number))) {
    return false;
  }
  if (number.length !== 10) {
    return false;
  }
  return true;
};
