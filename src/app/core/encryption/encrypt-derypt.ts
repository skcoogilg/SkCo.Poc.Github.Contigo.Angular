import * as CryptoJS from 'crypto-js';

export default class EncryptDecrypt {
  private keyString!: string;
  private ivString!: string;

  private key!: CryptoJS.lib.WordArray;
  private iv!: CryptoJS.lib.WordArray;

  constructor(key: string, iv: string) {
    this.setKey(key);
    this.setIv(iv);
  }

  setKey = (key: string): CryptoJS.lib.WordArray => {
    this.keyString = key;
    this.key = CryptoJS.enc.Utf8.parse(this.keyString);
    return this.key;
  };

  setIv = (iv: string): CryptoJS.lib.WordArray => {
    this.ivString = iv;
    this.iv = CryptoJS.enc.Utf8.parse(this.ivString);
    return this.iv;
  };

  getKeyString = (): string => this.keyString;
  getIvString = (): string => this.ivString;

  getKey = (): CryptoJS.lib.WordArray => this.key;
  getIv = (): CryptoJS.lib.WordArray => this.iv;

  encrypt(data: object): string {
    return CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(JSON.stringify(data)),
      this.key,
      {
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    )?.ciphertext?.toString();
  }

  decrypt(data: string): object | string {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
    const decrypt = CryptoJS.AES.decrypt(
      CryptoJS.enc.Base64.stringify(encryptedHexStr),
      this.key,
      {
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    const decryptData = decrypt?.toString(CryptoJS.enc.Utf8);
    try {
      return JSON.parse(decryptData);
    } catch (error) {
      console.info(
        'SensediaDecrypt: La respuesta del api no cumple con la estructura de un JSON válido, se retornará la información literal.'
      );
      return decryptData;
    }
  }
}
