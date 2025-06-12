export const getPersianDate = (
    timestamp: number,
    show_day: boolean = true,
    show_month: boolean = true,
    show_year: boolean = false): string => {
    const date = new Date(timestamp * 1000);
    const timeString = new Intl.DateTimeFormat('fa-IR', {dateStyle: 'medium'}).format(date)
    console.log(timeString)
    const index = timeString.split(' ');
    console.log(index)
    return `${show_year ? index[2] : ""} ${show_month ? index[1] :""} ${show_day ? index[0] : ""}`;
};