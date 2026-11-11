// utils-file.spec.ts
import { base64ToFile, downloadFile } from './file-utils';

describe('File Utilities', () => {
  describe('base64ToFile', () => {
    it('debería convertir un string base64 a un File', () => {
      const base64 = btoa('Test PDF Content'); // string base64
      const fileName = 'test.pdf';

      const file = base64ToFile(base64, fileName);

      expect(file).toBeInstanceOf(File);
      expect(file.name).toBe(fileName);
      expect(file.type).toBe('application/pdf');
      expect(file.size).toBeGreaterThan(0);
    });
  });

  describe('downloadFile', () => {
    let createObjectURLSpy: jasmine.Spy;
    let clickSpy: jasmine.Spy;
    let removeSpy: jasmine.Spy;

    beforeEach(() => {
      createObjectURLSpy = spyOn(window.URL, 'createObjectURL').and.returnValue(
        'blob:url',
      );

      const a = document.createElement('a');
      clickSpy = spyOn(a, 'click').and.callThrough();
      removeSpy = spyOn(a, 'remove').and.callThrough();

      spyOn(document, 'createElement').and.returnValue(a as any);
    });

    it('debería crear un link y disparar la descarga', () => {
      const file = new Blob(['test content'], { type: 'application/pdf' });
      const fileName = 'download.pdf';

      downloadFile(file, fileName);

      expect(window.URL.createObjectURL).toHaveBeenCalledWith(file);
      expect(document.createElement).toHaveBeenCalledWith('a');
      expect(clickSpy).toHaveBeenCalled();
      expect(removeSpy).toHaveBeenCalled();
    });
  });
});
