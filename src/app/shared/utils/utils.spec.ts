import { formatDate } from '@angular/common';
import { calculateAge, convertToISOWithUtc5, openPipelineTwo } from './utils';

describe('Date Utilities', () => {
  describe('calculateAge', () => {
    it('debería calcular la edad correctamente', () => {
      const today = new Date();
      const birthYear = today.getFullYear() - 25;
      const birthMonth = today.getMonth() + 1;
      const birthDay = today.getDate();

      const dateStr = `${birthYear}-${birthMonth}-${birthDay}`;
      const age = calculateAge(dateStr);

      expect(age).toBe('25');
    });

    it('debería restar 1 año si la fecha de cumpleaños no ha pasado aún este año', () => {
      const today = new Date();
      const birthYear = today.getFullYear() - 25;
      const birthMonth = today.getMonth() + 2; // mes futuro
      const birthDay = today.getDate();

      const dateStr = `${birthYear}-${birthMonth}-${birthDay}`;
      const age = calculateAge(dateStr);

      expect(age).toBe('24');
    });
  });

  describe('formatDate', () => {
    it('debería formatear correctamente la fecha en DD/MM/YYYY', () => {
      const dateStr = '2025-3-5';
      const formatted = formatDate(dateStr, 'dd/MM/yyyy', 'en-US');

      expect(formatted).toBe('05/03/2025');
    });

    it('debería mantener los días y meses mayores a 9 sin ceros adicionales', () => {
      const dateStr = '2025-12-15';
      const formatted = formatDate(dateStr, 'dd/MM/yyyy', 'en-US');

      expect(formatted).toBe('15/12/2025');
    });
  });

  describe('convertToISOWithUtc5', () => {
    it('debería convertir correctamente la fecha a ISO UTC con hora 05:00:00.000Z', () => {
      const input = '2025/5/31';
      const iso = convertToISOWithUtc5(input);

      const expected = new Date(2025, 4, 31, 0, 0, 0); // mes 4 = mayo
      expected.setUTCHours(5, 0, 0, 0);

      expect(iso).toBe(expected.toISOString());
    });
  });

  describe('openPipelineTwo', () => {
    it('debería llamar a window.open con la URL proporcionada', () => {
      const url = 'https://example.com';
      spyOn(window, 'open');

      openPipelineTwo(url);

      expect(window.open).toHaveBeenCalledWith(url);
    });
  });
});
