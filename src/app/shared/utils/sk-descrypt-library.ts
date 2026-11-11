import { CryptoCipherService as CryptoCipherServiceSkLibrary } from 'skandia-authencrypt'; // PoC: alias por API de 1.7.9 (npm público)

/**
 * Decrypts data from localStorage using a cipher service.
 * @param key
 * @param cipherService
 * @returns Decrypted data or null if decryption fails or no data is found.
 */
export function decryptFromLocalStorage(
  key: string,
  cipherService: CryptoCipherServiceSkLibrary
): any {
  const secret = sessionStorage.getItem('s1_cd') ?? '';
  const encryptedValue = localStorage.getItem(key) ?? '';
  if (!encryptedValue) {
    console.warn(`No data found in localStorage for key "${key}"`);
    return null;
  }

  try {
    const decryptedRaw = cipherService.cipher(secret).deCrypt(encryptedValue);
    const decryptedParsed =
      typeof decryptedRaw === 'string'
        ? JSON.parse(decryptedRaw)
        : decryptedRaw;

    return decryptedParsed;
  } catch (err) {
    console.error(`Decryption failed for key "${key}"`, err);
    return null;
  }
}

/**
 * Encrypts data and stores it in localStorage using a cipher service.
 * @param key
 * @param data
 * @param cipherService
 */

export function encryptToLocalStorage(
  key: string,
  data: any,
  cipherService: CryptoCipherServiceSkLibrary
): void {
  const secret = sessionStorage.getItem('s1_cd') ?? '';
  try {
    const encryptedData = cipherService.cipher(secret).encrypt(data);
    localStorage.setItem(key, encryptedData);
  } catch (err) {
    console.error(`Encryption failed for key "${key}"`, err);
  }
}
