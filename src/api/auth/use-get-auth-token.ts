import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import { type TokenResponse } from './types';

type Variables = {
  username: string;
  password: string;
  userCategoryId: number;
  tenantId: string;
};

type Response = TokenResponse;

export const useGetAuthToken = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const { username, password, userCategoryId, tenantId } = variables;
    
    return client({
      url: '/auth/token',
      method: 'POST',
      data: {
        username,
        password,
        userCategoryId
      },
      headers: {
        "X-PrivateTenant": tenantId
      }
    }).then((response) => response.data);
  }
});