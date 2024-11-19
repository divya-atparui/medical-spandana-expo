import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';

type Response = DepartmentsResponse;
type Variables = {
  tenantId: string;
};

export const useGetAllDepartments = createQuery<Response, Variables, AxiosError>({
  queryKey: ['departments'],
  fetcher: () => {
    return client.get(`/api/departments/all`).then((response) => response.data.posts);
  },
});
