import { BaseObject, Page } from '../models/base.interface';
import { mapToURLParams } from './api-services/param.helper';

const SERVER = 'http://127.0.0.1:3000/';

export default class Loader {
  private static errorHandler(res: Response): Response {
    if (!res.ok) {
      throw Error(res.status.toString());
    }

    return res;
  }

  private static load(url: URL, method: string, data?: BaseObject): Promise<Response> {
    return fetch(url, { method, body: data ? JSON.stringify(data) : undefined })
      .then((res: Response) => Loader.errorHandler(res));

    // .catch((err: Error) => console.error(err));
  }

  public static getPage<T>(url: string, params?: BaseObject): Promise<Page<T>> {
    const query = new URL(url, SERVER);

    if (params) {
      query.search = new URLSearchParams(mapToURLParams(params)).toString();
    }

    return Loader.load(query, 'GET')
      .then((res: Response) => res.json()
        .then((items: T[]) => {
          const total = res.headers.get('X-Total-Count');
          return {
            total: total ? +total : 0,
            items,
          };
        }));
  }

  public static get<T>(url: string, params?: BaseObject): Promise<T> {
    const query = new URL(url, SERVER);

    if (params) {
      query.search = new URLSearchParams(mapToURLParams(params)).toString();
    }

    return Loader.load(query, 'GET').then((res: Response) => res.json());
  }

  public static post<T>(url: string, data: BaseObject): Promise<T> {
    return Loader.load(new URL(url, SERVER), 'POST', data).then((res: Response) => res.json());
  }

  public static put<T>(url: string, data: BaseObject): Promise<T> {
    return Loader.load(new URL(url, SERVER), 'PUT', data).then((res: Response) => res.json());
  }

  public static patch<T>(url: string, params?: BaseObject): Promise<T> {
    const query = new URL(url, SERVER);

    if (params) {
      query.search = new URLSearchParams(mapToURLParams(params)).toString();
    }

    return Loader.load(query, 'PATCH').then((res: Response) => res.json());
  }

  public static delete<T>(url: string): Promise<T> {
    return Loader.load(new URL(url, SERVER), 'DELETE').then((res: Response) => res.json());
  }
}
