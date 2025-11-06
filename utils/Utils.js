export default class CommonUtils {
  generateInvoiceNumber() {
    const now = new Date();

    // Format tanggal: YYYYMMDD-HHmmss
    const timestamp = now
      .toISOString()
      .replace(/[-T:.Z]/g, '')
      .slice(0, 14);

    // Random 4-digit number
    const random = Math.floor(1000 + Math.random() * 9000);

    // Format hasil: INV-20251106093000-4821
    return `INV-${timestamp}-${random}`;
  }
}
