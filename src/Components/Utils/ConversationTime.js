import { format, isToday, isYesterday } from 'date-fns';

export default function ConversationTime(date) {
    // Check if it is a valid date
    if (date === 'Invalid Date') return '';

    if (isToday(date)) {
        return format(date, 'hh:mm a');
    }

    if (isYesterday(date)) {
        return 'Yesterday';
    }

    return format(date, 'dd/MM/yy');
}
