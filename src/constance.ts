import {
    CalendarDate,
    GregorianCalendar,
    toCalendar,
} from "@internationalized/date";

export const convertSupportedDateFormat = (date: string) => {
    const [day, month, year] = date.split("/").map(Number);
    return toCalendar(
        new CalendarDate(year, month, day),
        new GregorianCalendar()
    );
};
