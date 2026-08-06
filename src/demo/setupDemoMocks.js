import axios from 'axios';
import { handleDemoRequest } from './demoApi';

function normalizeHeaders(headers) {
  if (!headers) return {};
  if (typeof headers.forEach === 'function') {
    const out = {};
    headers.forEach((value, key) => {
      out[key] = value;
    });
    return out;
  }
  return { ...headers };
}

function mockAxiosResponse(config, result) {
  return {
    data: result.data,
    status: result.status || 200,
    statusText: result.status >= 400 ? 'Error' : 'OK',
    headers: { 'content-type': 'application/json' },
    config,
    request: {},
  };
}

/** Intercept axios + fetch — this app runs without a backend. */
export function setupDemoMocks() {
  // eslint-disable-next-line no-console
  console.info('[SOMNIA UI demo] Mock API enabled — no backend required.');

  axios.interceptors.request.use((config) => {
    const method = config.method || 'get';
    const url = config.url || '';
    const result = handleDemoRequest({
      method,
      url,
      data: config.data,
      headers: normalizeHeaders(config.headers),
    });

    config.adapter = async () => {
      if (result.status >= 400) {
        const error = new Error(`Demo API ${result.status}`);
        error.config = config;
        error.response = mockAxiosResponse(config, result);
        error.isAxiosError = true;
        return Promise.reject(error);
      }
      return mockAxiosResponse(config, result);
    };
    return config;
  });

  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input, init = {}) => {
    const url = typeof input === 'string' ? input : input?.url;
    const method = (init.method || 'GET').toUpperCase();
    const headers = normalizeHeaders(init.headers);
    let body = init.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        /* keep string */
      }
    }

    const looksLikeApi =
      typeof url === 'string' &&
      (url.includes('/report/') ||
        url.includes('/submit/') ||
        url.includes('/login/') ||
        url.includes('/answers/') ||
        url.includes('/notification/') ||
        url.includes('demo.local'));

    if (!looksLikeApi) {
      return originalFetch(input, init);
    }

    const result = handleDemoRequest({
      method,
      url,
      data: body,
      headers,
    });

    return new Response(JSON.stringify(result.data), {
      status: result.status || 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };
}
