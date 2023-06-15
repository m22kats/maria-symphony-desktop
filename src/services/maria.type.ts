interface MariaDataResponse<T> {
  items?: Array<T>;
  page?: MariaDataPageResponse;
}

interface MariaDataPageResponse {
  total?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
  currentPage?: number;
}

interface MariaStatusResponse {
  code?: string;
  message?: string;
}

export interface MariaResponse<T = any> {
  data?: MariaDataResponse<T>;
  status?: MariaStatusResponse;
}
