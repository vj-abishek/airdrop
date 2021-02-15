import { isToday, isYesterday, format } from 'date-fns';

export default function LastSeen(date) {
    if (isToday(date)) {
        return format(date, "'Last seen at' hh:mm a");
    }
    if (isYesterday(date)) {
        return format(date, "'Last seen yesterday at' hh:mm a");
    }

    return format(date, "'Last seen' MMM dd 'at' hh:mm a");
}
