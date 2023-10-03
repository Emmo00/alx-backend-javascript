export default function createInt8TypedArray(length, position, value) {
  const buffer = new ArrayBuffer(length);
  try {
    const view = new DataView(buffer, position);
    view.setInt8(0, value);
  } catch (err) {
    throw new Error('Position outside range');
  }

  return new DataView(buffer);
}
