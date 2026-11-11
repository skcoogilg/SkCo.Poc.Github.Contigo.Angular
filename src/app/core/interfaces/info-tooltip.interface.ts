/**
 * type: Representa los diferentes tipos de visualización disponibles.
 * - withIcon: Muestra el tooltip con un icono de acuerdo a la class del font que se le envíe.
 * - textOnly: Muestra el tooltip sobre un texto.
 * - initialLetter: Muestra el tooltip en un icono con la letra inicial del texto ue se le envíe.
 * - pointColor: Muestra el tooltip como un punto de color.
 * message: Msn que se muestra sobre el tooltip
 * strongMsnIni: Msn en bold al inicio del tooltip
 * strongMsnFin: Msn en bold al final del tooltip
 * posX: Posicionamiento del mensaje del tooltip en el eje x
 * posY: Posicionamiento del mensaje del tooltip en el eje y
 * colorIcon: Color del icono si se escoge el type 'withIcon'
 * - gris-sk: Color gris
 * - warm-sk: Color amarillo
 * colorPoint: Color del punto si se escoge el type 'pointColor'
 */
export interface InfoTooltip {
  type:              'withIcon' | 'textOnly' | 'initialLetter' | 'pointColor' | 'cover',
  message:           string,
  strongMsnIni?:     string,
  strongMsnFin?:     string,
  posX?:             string,
  posY?:             string,
  colorIcon?:        'gris-sk' | 'warm-sk',
  iconClass?:        string,
  colorPoint?:       string // **hexadecimal
  customStyle?: any;
}
