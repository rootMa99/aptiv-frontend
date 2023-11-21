export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getCurrentWeek = (index) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const startOfWeek = new Date(currentDate);
  const endOfWeek = new Date(currentDate);
  if (index === "last") {
    startOfWeek.setDate(currentDate.getDate() - currentDay - 7);
    endOfWeek.setDate(currentDate.getDate() - currentDay);
  }
  if (index === "current") {
    startOfWeek.setDate(currentDate.getDate() - currentDay);
    endOfWeek.setDate(currentDate.getDate() + (7 - currentDay));
  }
  return {
    startDWeek: formatDate(startOfWeek),
    endDWeek: formatDate(endOfWeek),
  };
};

export const getCurrentYear = () => {
  const curretDate = new Date();
  const currentYear = curretDate.getFullYear();
  const firstJan = new Date(currentYear, 0, 1);
  const dec = new Date(currentYear, 11, 31);

  return { firstJan: formatDate(firstJan), dec: formatDate(dec) };
};

export const getCurrentMonth = () => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  return {
    firstDayOfMonth: formatDate(firstDayOfMonth),
    lastDayOfMonth: formatDate(lastDayOfMonth),
  };
};

export const getLastMonth = () => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0
  );
  return {
    firstDayOfMonth: formatDate(firstDayOfMonth),
    lastDayOfMonth: formatDate(lastDayOfMonth),
  };
};
