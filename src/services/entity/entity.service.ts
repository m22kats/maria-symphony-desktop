import {
  Entity,
  EntitySearchRequest,
  EntityCreateRequest,
  EntityDeleteRequest,
} from './entity.service.type';
import { mariaClient } from '../maria-client';
import { MariaResponse } from '../maria.type';

export const entityService = {
  search: async (
    request: EntitySearchRequest
  ): Promise<MariaResponse<Entity>> => {
    const url = 'http://localhost:8080/symphony/v1/entities/page';

    // Join melody type array with commas
    const code = request.code.join(',');

    // Update the query parameters with the formatted values
    const params = {
      dataType: request.dataType,
      organization: request.organization,
      searchText: request.searchText,
      code,
      pageIdx: request.pageIndex,
      size: request.pageSize,
    };

    const response = await mariaClient.get(url, { params });
    return response?.data;
  },
  create: async (request: EntityCreateRequest): Promise<MariaResponse<any>> => {
    const url = 'http://localhost:8080/symphony/v1/entities';
    const response = await mariaClient.post(url, request);
    return response?.data;
  },
  delete: async (request: EntityDeleteRequest): Promise<MariaResponse<any>> => {
    const url = 'http://localhost:8080/symphony/v1/entities/delete';
    const response = await mariaClient.post(url, request);
    return response?.data;
  },
};
