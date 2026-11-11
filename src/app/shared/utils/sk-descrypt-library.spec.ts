// utils-storage.spec.ts
import { CryptoCipherService as CryptoCipherServiceSkLibrary } from 'skandia-authencrypt'; // PoC: alias por API de 1.7.9 (npm público)
import {
  decryptFromLocalStorage,
  encryptToLocalStorage,
} from './sk-descrypt-library';

describe('LocalStorage Utilities with Encryption', () => {
  let cipherService: jasmine.SpyObj<CryptoCipherServiceSkLibrary>;
  let cipherMock: any;

  beforeEach(() => {
    cipherMock = {
      encrypt: jasmine.createSpy('encrypt'),
      deCrypt: jasmine.createSpy('deCrypt'),
    };

    cipherService = jasmine.createSpyObj('CryptoCipherServiceSkLibrary', [
      'cipher',
    ]);
    cipherService.cipher.and.returnValue(cipherMock);

    // Limpiar storages antes de cada test
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('encryptToLocalStorage', () => {
    it('debería cifrar los datos y guardarlos en localStorage', () => {
      const key = 'myKey';
      const data = { name: 'test' };
      const secret = 'secret123';
      sessionStorage.setItem('s1_cd', secret);

      cipherMock.encrypt.and.returnValue('encryptedData');

      encryptToLocalStorage(key, data, cipherService);

      expect(cipherService.cipher).toHaveBeenCalledWith(secret);
      expect(cipherMock.encrypt).toHaveBeenCalledWith(data);
      expect(localStorage.getItem(key)).toBe('encryptedData');
    });

    it('debería capturar error si encrypt falla', () => {
      const key = 'myKey';
      const data = { name: 'test' };
      const secret = 'secret123';
      sessionStorage.setItem('s1_cd', secret);

      cipherMock.encrypt.and.throwError('Fail');

      expect(() =>
        encryptToLocalStorage(key, data, cipherService),
      ).not.toThrow();
      // Verifica que la clave no fue guardada
      expect(localStorage.getItem(key)).toBeNull();
    });
  });

  describe('decryptFromLocalStorage', () => {
    it('debería descifrar los datos y parsearlos', () => {
      const key = 'myKey';
      const secret = 'secret123';
      const storedData = JSON.stringify({ name: 'test' });

      sessionStorage.setItem('s1_cd', secret);
      localStorage.setItem(key, 'encryptedData');

      cipherMock.deCrypt.and.returnValue(storedData);

      const result = decryptFromLocalStorage(key, cipherService);

      expect(cipherService.cipher).toHaveBeenCalledWith(secret);
      expect(cipherMock.deCrypt).toHaveBeenCalledWith('encryptedData');
      expect(result).toEqual({ name: 'test' });
    });

    it('debería retornar null si no hay datos en localStorage', () => {
      const key = 'missingKey';

      const result = decryptFromLocalStorage(key, cipherService);
      expect(result).toBeNull();
    });

    it('debería retornar null si la desencriptación falla', () => {
      const key = 'myKey';
      const secret = 'secret123';

      sessionStorage.setItem('s1_cd', secret);
      localStorage.setItem(key, 'encryptedData');

      cipherMock.deCrypt.and.throwError('Fail');

      const result = decryptFromLocalStorage(key, cipherService);
      expect(result).toBeNull();
    });

    it('debería retornar null si deCrypt devuelve datos no parseables', () => {
      const key = 'myKey';
      const secret = 'secret123';

      sessionStorage.setItem('s1_cd', secret);
      localStorage.setItem(key, 'encryptedData');

      // Simular un retorno que no sea string
      const rawObject = { some: 'object' };
      cipherMock.deCrypt.and.returnValue(rawObject);

      const result = decryptFromLocalStorage(key, cipherService);
      expect(result).toEqual(rawObject);
    });
  });
});
