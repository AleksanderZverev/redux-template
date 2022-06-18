import { RootState } from '../redux/store';
import { useTypedSelector } from './useTypedSelector';

export const useRequiredTypedSelector = <TResult>(
    select: (state: RootState) => TResult | undefined | null
): TResult => {
    const result = useTypedSelector(select);
    if (!result) throw new Error('Required service is undefined');
    return result;
};
