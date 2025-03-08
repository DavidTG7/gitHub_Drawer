type GridCell = {
  id: number;
  clicks: number;
};

type YearGrid = Record<string, GridCell>;

export const generateYearGrid = (year: number) => {
  const daysInYear = isLeapYear(year) ? 366 : 365;
  const startDate = new Date(`${year}-01-01`);
  const grid: YearGrid = {};

  for (let i = 0; i < daysInYear; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const dateKey = date.toISOString().split('T')[0];

    grid[dateKey] = {
      id: i + 1,
      clicks: 0,
    };
  }

  return grid;
};

const isLeapYear = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const getDayOfWeek = (dateString: string): number => {
  return new Date(dateString).getDay();
};
