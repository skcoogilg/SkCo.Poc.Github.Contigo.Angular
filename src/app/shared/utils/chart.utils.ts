/**
 * Escucha los eventos de redimensionamiento de la ventana y ajusta las opciones del gráfico en consecuencia.
 * @param myChart - La instancia del gráfico que se va a redimensionar
 * @param option - Las opciones del gráfico que se van a actualizar
 */
export const listenWindowsResize = (myChart: any, option: any) => {
  window.addEventListener('resize', () => {
    option.legend.width = window.innerWidth < 769 ? '50%' : '78%';
    option && myChart.setOption(option, true);
    myChart?.resize();
  });
};

export const defaultPosition = (
  point: any,
  params: any,
  dom: any,
  rect: any,
  size: any
) => {
  const tooltipWidth = size.contentSize[0];
  const chartWidth = size.viewSize[0];

  let x = point[0] + 10; // por defecto a la derecha
  let y = point[1];

  // Si el tooltip se sale por la derecha, mostrarlo a la izquierda
  if (point[0] + tooltipWidth > chartWidth) {
    x = point[0] - tooltipWidth - 10;
  }

  // Si también se va a salir por la izquierda, forzarlo a 0
  if (x < 0) {
    x = 0;
  }

  return [x, y];
};
