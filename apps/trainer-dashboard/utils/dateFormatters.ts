export function formatDate(date: Date | string, format: 'short' | 'long' | 'full' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  // Manual formatting to ensure consistency between server and client
  const weekdays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
  const monthsFull = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  
  const weekday = weekdays[d.getDay()];
  const day = d.getDate();
  const month = months[d.getMonth()];
  const monthFull = monthsFull[d.getMonth()];
  const year = d.getFullYear();
  
  switch (format) {
    case 'short':
      // Format: "Mi. 24. Jan."
      return `${weekday}. ${day}. ${month}.`;
    case 'long':
      // Format: "24.01.2024"
      return `${day.toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${year}`;
    case 'full':
      // Format: "Mittwoch, 24. Januar 2024"
      return `${weekday}, ${day}. ${monthFull} ${year}`;
    default:
      return `${day}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${year}`;
  }
}

export function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}