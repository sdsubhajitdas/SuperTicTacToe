export function generateRoomNumber(length: number = 5) {
  return Math.ceil(Math.random() * Math.pow(10, length));
}