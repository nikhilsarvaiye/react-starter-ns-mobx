import { useMemo } from 'react';
import debounce from 'lodash/debounce';

// Our hook
export const useDebounce = (func: any, debounceTimeout?: number) => {
    return useMemo(() => {
        return debounce(func, debounceTimeout || 400);
    }, [debounceTimeout, func]);
};
