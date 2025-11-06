import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

// Load plugins
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * TimeHelper - Utility untuk menangani zona waktu WIB secara konsisten
 * Menggunakan Asia/Jakarta timezone untuk WIB (UTC+7)
 */
export default class TimeHelper {
  static WIB_TIMEZONE = "Asia/Jakarta";

  /**
   * Mendapatkan waktu sekarang dalam zona waktu WIB
   * @returns {dayjs.Dayjs} - Objek dayjs dengan timezone WIB
   */
  static nowWIB() {
    return dayjs().tz(this.WIB_TIMEZONE);
  }

  /**
   * Mengkonversi date ke timezone WIB
   * @param {Date|string|dayjs.Dayjs} date - Date yang akan dikonversi
   * @returns {dayjs.Dayjs} - Objek dayjs dengan timezone WIB
   */
  static toWIB(date) {
    return dayjs(date).tz(this.WIB_TIMEZONE);
  }

  /**
   * Format waktu untuk database PostgreSQL (YYYY-MM-DD HH:mm:ss)
   * @param {Date|string|dayjs.Dayjs} date - Date yang akan diformat (optional, default: now)
   * @returns {string} - String dengan format PostgreSQL timestamp
   */
  static formatForDatabase(date = null) {
    const targetDate = date ? this.toWIB(date) : this.nowWIB();
    return targetDate.format("YYYY-MM-DD HH:mm:ss");
  }

  /**
   * Format waktu untuk display (DD/MM/YYYY HH:mm:ss)
   * @param {Date|string|dayjs.Dayjs} date - Date yang akan diformat
   * @returns {string} - String dengan format display
   */
  static formatForDisplay(date) {
    return this.toWIB(date).format("DD/MM/YYYY HH:mm:ss");
  }

  /**
   * Format tanggal saja (YYYY-MM-DD)
   * @param {Date|string|dayjs.Dayjs} date - Date yang akan diformat (optional, default: now)
   * @returns {string} - String dengan format tanggal
   */
  static formatDateOnly(date = null) {
    const targetDate = date ? this.toWIB(date) : this.nowWIB();
    return targetDate.format("YYYY-MM-DD");
  }

  /**
   * Format waktu saja (HH:mm:ss)
   * @param {Date|string|dayjs.Dayjs} date - Date yang akan diformat (optional, default: now)
   * @returns {string} - String dengan format waktu
   */
  static formatTimeOnly(date = null) {
    const targetDate = date ? this.toWIB(date) : this.nowWIB();
    return targetDate.format("HH:mm:ss");
  }

  /**
   * Mendapatkan timestamp Unix dalam WIB
   * @param {Date|string|dayjs.Dayjs} date - Date yang akan dikonversi (optional, default: now)
   * @returns {number} - Unix timestamp
   */
  static getUnixTimestamp(date = null) {
    const targetDate = date ? this.toWIB(date) : this.nowWIB();
    return targetDate.unix();
  }

  /**
   * Mendapatkan ISO string dalam WIB
   * @param {Date|string|dayjs.Dayjs} date - Date yang akan dikonversi (optional, default: now)
   * @returns {string} - ISO string
   */
  static toISOString(date = null) {
    const targetDate = date ? this.toWIB(date) : this.nowWIB();
    return targetDate.toISOString();
  }

  /**
   * Parse string tanggal dan konversi ke WIB
   * @param {string} dateString - String tanggal yang akan diparse
   * @param {string} format - Format string (optional)
   * @returns {dayjs.Dayjs} - Objek dayjs dengan timezone WIB
   */
  static parseToWIB(dateString, format = null) {
    if (format) {
      return dayjs(dateString, format).tz(this.WIB_TIMEZONE);
    }
    return dayjs(dateString).tz(this.WIB_TIMEZONE);
  }

  /**
   * Menambah waktu tertentu ke date
   * @param {Date|string|dayjs.Dayjs} date - Date base
   * @param {number} amount - Jumlah yang ditambah
   * @param {string} unit - Unit waktu (day, hour, minute, etc.)
   * @returns {dayjs.Dayjs} - Objek dayjs hasil penambahan
   */
  static add(date, amount, unit) {
    return this.toWIB(date).add(amount, unit);
  }

  /**
   * Mengurangi waktu tertentu dari date
   * @param {Date|string|dayjs.Dayjs} date - Date base
   * @param {number} amount - Jumlah yang dikurangi
   * @param {string} unit - Unit waktu (day, hour, minute, etc.)
   * @returns {dayjs.Dayjs} - Objek dayjs hasil pengurangan
   */
  static subtract(date, amount, unit) {
    return this.toWIB(date).subtract(amount, unit);
  }

  /**
   * Mengecek apakah date1 sebelum date2
   * @param {Date|string|dayjs.Dayjs} date1
   * @param {Date|string|dayjs.Dayjs} date2
   * @returns {boolean}
   */
  static isBefore(date1, date2) {
    return this.toWIB(date1).isBefore(this.toWIB(date2));
  }

  /**
   * Mengecek apakah date1 sesudah date2
   * @param {Date|string|dayjs.Dayjs} date1
   * @param {Date|string|dayjs.Dayjs} date2
   * @returns {boolean}
   */
  static isAfter(date1, date2) {
    return this.toWIB(date1).isAfter(this.toWIB(date2));
  }

  /**
   * Mengecek apakah date1 sama dengan date2
   * @param {Date|string|dayjs.Dayjs} date1
   * @param {Date|string|dayjs.Dayjs} date2
   * @param {string} unit - Unit perbandingan (optional, default: millisecond)
   * @returns {boolean}
   */
  static isSame(date1, date2, unit = "millisecond") {
    return this.toWIB(date1).isSame(this.toWIB(date2), unit);
  }

  /**
   * Mendapatkan selisih antara dua tanggal
   * @param {Date|string|dayjs.Dayjs} date1
   * @param {Date|string|dayjs.Dayjs} date2
   * @param {string} unit - Unit selisih (day, hour, minute, etc.)
   * @returns {number} - Selisih dalam unit yang ditentukan
   */
  static diff(date1, date2, unit = "millisecond") {
    return this.toWIB(date1).diff(this.toWIB(date2), unit);
  }

  /**
   * Mendapatkan awal hari dari tanggal tertentu
   * @param {Date|string|dayjs.Dayjs} date - Date (optional, default: now)
   * @returns {dayjs.Dayjs} - Objek dayjs pada awal hari
   */
  static startOfDay(date = null) {
    const targetDate = date ? this.toWIB(date) : this.nowWIB();
    return targetDate.startOf("day");
  }

  /**
   * Mendapatkan akhir hari dari tanggal tertentu
   * @param {Date|string|dayjs.Dayjs} date - Date (optional, default: now)
   * @returns {dayjs.Dayjs} - Objek dayjs pada akhir hari
   */
  static endOfDay(date = null) {
    const targetDate = date ? this.toWIB(date) : this.nowWIB();
    return targetDate.endOf("day");
  }
}
