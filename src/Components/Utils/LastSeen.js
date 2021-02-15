import { isToday, isYesterday, format } from 'date-fns';

export default function LastSeen(date) {

    // Check if it is a valid date
    if (date === 'Invalid Date') return '';

    if (isToday(date)) {
        return format(date, "'last seen at' hh:mm a");
    }
    if (isYesterday(date)) {
        return format(date, "'last seen yesterday at' hh:mm a");
    }

    return format(date, "'last seen' MMM dd 'at' hh:mm a");
}
