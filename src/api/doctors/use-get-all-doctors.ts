import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';

type Response = DoctorsResponse;
type Variables = {
  tenantId: string;
};

export const useGetAllDoctors = createQuery<Response, Variables, AxiosError>({
  queryKey: ['doctors'],
  fetcher: async({tenantId}) => {
    const data =  client.get("/api/doctors/all",{
      headers: {
        "X-PrivateTenant": tenantId,
      }
    }).then((response) => response.data);
    return data
  },
});
