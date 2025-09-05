export const generateRandomPin = () => {
  const pin = [];
  while (pin.length < 5) {
    pin.push(Math.floor(Math.random() * 10))
  }
  return pin.join("");
}
