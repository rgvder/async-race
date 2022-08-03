import { BaseObject } from '../../models/base.interface';

export function convertToString(value: string | number | boolean | number[] | undefined): string {
  if (value === undefined) {
    return '';
  }
  return typeof value === 'string' ? value : value.toString();
}

export function mapToURLParams(obj: BaseObject, isKeyNeedPrefix: boolean = false): Record<string, string> {
  return Object.keys(obj).reduce((params: Record<string, string>, key: string) => ({
    ...params,
    [!isKeyNeedPrefix ? key : `_${key}`]: convertToString(obj[key]),
  }), {});
}
