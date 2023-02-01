export const distinct = (value: any, index: number, self: any[]) => {
    return self.indexOf(value) === index;
};

export const capitalize = (s: string) => {
    if (typeof s != 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const getDateMonth = (date: Date): string => {
    if (!date) {
        return '';
    }
    return monthNames[date.getMonth()];
};
