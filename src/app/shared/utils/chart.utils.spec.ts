// utils.spec.ts

import { defaultPosition, listenWindowsResize } from './chart.utils';

describe('ChartUtils', () => {
  describe('listenWindowsResize', () => {
    let myChart: any;
    let option: any;

    beforeEach(() => {
      myChart = {
        setOption: jasmine.createSpy('setOption'),
        resize: jasmine.createSpy('resize'),
      };

      option = { legend: { width: '78%' } };
    });

    it('debería ajustar legend.width cuando se redimensiona la ventana', () => {
      // Simular ventana ancha
      spyOnProperty(window, 'innerWidth').and.returnValue(1024);

      // Llamar la función para registrar el listener
      listenWindowsResize(myChart, option);

      // Disparar evento resize
      window.dispatchEvent(new Event('resize'));

      expect(option.legend.width).toBe('78%');
      expect(myChart.setOption).toHaveBeenCalledWith(option, true);
      expect(myChart.resize).toHaveBeenCalled();
    });

    it('debería ajustar legend.width a 50% en ventana pequeña', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(500);

      listenWindowsResize(myChart, option);
      window.dispatchEvent(new Event('resize'));

      expect(option.legend.width).toBe('50%');
      expect(myChart.setOption).toHaveBeenCalledWith(option, true);
      expect(myChart.resize).toHaveBeenCalled();
    });
  });

  describe('defaultPosition', () => {
    const chartWidth = 300;
    const tooltipWidth = 100;

    it('debería posicionar tooltip a la derecha por defecto', () => {
      const point = [50, 20];
      const size = {
        contentSize: [tooltipWidth, 20],
        viewSize: [chartWidth, 200],
      };

      const pos = defaultPosition(point, null, null, null, size);

      expect(pos).toEqual([60, 20]); // 50 + 10
    });

    it('debería mover tooltip a la izquierda si se sale por la derecha', () => {
      const point = [250, 20];
      const size = {
        contentSize: [tooltipWidth, 20],
        viewSize: [chartWidth, 200],
      };

      const pos = defaultPosition(point, null, null, null, size);

      expect(pos).toEqual([140, 20]); // 250 - 100 - 10
    });
  });
});
