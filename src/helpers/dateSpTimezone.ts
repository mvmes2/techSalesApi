export const spTimeZoneDate = (date: Date): Date => {
  const timeZone = 'America/Sao_Paulo';

  // Formata a data diretamente usando Intl.DateTimeFormat
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone,
    hour12: false,
  };

  const formattedDateStr = new Intl.DateTimeFormat('sv-SE', options).format(date).replace(/(\d+)\/(\d+)\/(\d+),/, '$3-$2-$1');


  // Converte a string formatada de volta para um objeto Date
  const [datePart, timePart] = formattedDateStr.split(' ');
  const [year, month, day] = datePart.split('-');
  const [hour, minute, second] = timePart.split(':');
  const spDate = new Date(Date.UTC(+year, +month - 1, +day, +hour, +minute, +second));

  return spDate;
};
