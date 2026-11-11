/**
 * Función que permite calcular la edad de una persona por medio de su fecha de nacimiento
 * @param {string} data Fecha de cumpleaños como string
 * @returns {string} Edad como string
 */
export const calculateAge = (data: string): string => {
  var today = new Date();
  var birthday = new Date(data);
  var age = today.getFullYear() - birthday.getFullYear();
  var m = today.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  return age.toString();
};

export const formatDate = (date: string) => {
  const tmpDate = new Date(date);
  const day =
    tmpDate.getDate() < 10 ? `0${tmpDate.getDate()}` : tmpDate.getDate();
  const month =
    tmpDate.getMonth() + 1 < 10
      ? `0${tmpDate.getMonth() + 1}`
      : tmpDate.getMonth() + 1;
  const year = tmpDate.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Convierte una fecha en formato "YYYY/M/D" a formato ISO UTC con hora 05:00:00.000Z
 * @param {string} input - Fecha en formato "2025/5/31"
 * @returns {string} Fecha en formato ISO UTC "YYYY-MM-DDT05:00:00.000Z"
 */
export const convertToISOWithUtc5 = (input: string): string => {
  const [year, month, day] = input.split('/').map(Number);

  // Crear la fecha con hora local 00:00
  const localDate = new Date(year, month - 1, day, 0, 0, 0);

  // Ajustar hora UTC a las 5:00 AM
  localDate.setUTCHours(5, 0, 0, 0);

  return localDate.toISOString();
};

export const openPipelineTwo = (url: string) => {
  window.open(url);
};
