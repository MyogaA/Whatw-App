import {useQuery} from '@tanstack/react-query';
import {API_GOLANG} from '../libs/api';

export function useQuetion() {
  const {data: Questions} = useQuery<any>({
    queryKey: ['questions'],
    queryFn: async () =>
      await API_GOLANG.get('/questions').then(res => res.data.data),
  });

  return {Questions};
}
