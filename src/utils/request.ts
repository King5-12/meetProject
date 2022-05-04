import querystring from 'querystring';

import { apiPrefix, group } from '@/config';
import { tokenStorage, employeeIdStorage } from './storage';

interface RequestOptionType {
    method?: string;
    headers?: {
        [header: string]: string;
    };
    body?: any;
}

export interface ResponseType<T = any> {
    success: boolean;
    data: T;
    code: string;
    message: string;
    total?: number;
    pageIndex?: number;
    pageSize?: number;
}

interface ParamsType {
    [x: string]: any;
}

interface RequestInterface {
    <T = any>(
        url: string,
        options?: RequestOptionType,
        params?: ParamsType,
    ): Promise<ResponseType<T>>;
    get<T = any>(
        url: string,
        query?: ParamsType,
        customUrl?: boolean,
    ): Promise<ResponseType<T>>;
    post<T = any>(
        url: string,
        body?: RequestOptionType['body'],
        customUrl?: boolean,
    ): Promise<ResponseType<T>>;
    put<T = any>(
        url: string,
        body?: RequestOptionType['body'],
    ): Promise<ResponseType<T>>;
    delete<T = any>(url: string): Promise<ResponseType<T>>;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param {string} url      - The path we want to request
 * @param {Object} [options] - The options we want to pass to "fetch"
 * @param {Object} [params]
 *
 * @return {object}           An object containing either "data" or "err"
 */
const request: RequestInterface = async (url, options, params) => {
    const headers = {
        ...((options || {}).headers || {}),
    };
    const token = tokenStorage.get();
    const employeeId = employeeIdStorage.get();

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    if (employeeId) {
        // eslint-disable-next-line @typescript-eslint/camelcase
        headers.employee_id = employeeId;
    }

    if (group) {
        headers.group = group;
    }

    const response = await fetch(
        params ? `${url}?${querystring.stringify(params)}` : url,
        {
            ...options,
            headers,
        },
    );

    const resJson = await response.json();

    if (response.status < 200 || response.status > 299 || !resJson.success) {
        throw Object.assign(new URIError(response.statusText), resJson);
    }

    return resJson;
};

request.get = (url, query, customUrl) => {
    return request(customUrl ? url : `${apiPrefix}${url}`, {}, query);
};

request.post = (url, body, customUrl) =>
    request(customUrl ? url : `${apiPrefix}${url}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
    });

request.put = (url, body) =>
    request(`${apiPrefix}${url}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
    });

request.delete = url =>
    request(`${apiPrefix}${url}`, {
        method: 'DELETE',
    });

export default request;
