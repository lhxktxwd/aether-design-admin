import { http } from '@/services/http';
import type { OrderRecord } from '@/types/design';

export interface OrderListParams {
  keyword?: string;
  page?: number;
  pageSize?: number;
}

export interface OrderListResponse {
  items: OrderRecord[];
  total: number;
}

export function fetchOrders(params: OrderListParams = {}) {
  return http<OrderListResponse>('/orders', { query: { ...params } });
}
