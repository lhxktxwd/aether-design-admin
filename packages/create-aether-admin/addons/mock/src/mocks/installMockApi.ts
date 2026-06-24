import type { OrderRecord } from '@/types/design';

const orders: OrderRecord[] = [
  {
    id: '#ORD-1042',
    customer: 'Acme Workspace',
    status: 'Paid',
    amount: '$12,400',
    updatedAt: '2 min ago',
    owner: 'Sarah Chen',
  },
  {
    id: '#ORD-1041',
    customer: 'Northstar Labs',
    status: 'Pending',
    amount: '$8,920',
    updatedAt: '16 min ago',
    owner: 'Dylan Park',
  },
  {
    id: '#ORD-1040',
    customer: 'Orbit Finance',
    status: 'Failed',
    amount: '$2,180',
    updatedAt: '1 hr ago',
    owner: 'Nina Patel',
  },
];

export function installMockApi() {
  if (import.meta.env.PROD || import.meta.env.VITE_USE_MOCK !== 'true') return;

  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input, init) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    const parsed = new URL(url, window.location.origin);

    if (parsed.pathname.endsWith('/api/orders')) {
      return jsonResponse({
        items: orders,
        total: orders.length,
      });
    }

    return originalFetch(input, init);
  };
}

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
