import { BaseObject } from '../models/base.interface';
import { convertToString } from './api-services/param.helper';

export default class ElementBuilder {
  public static buildElement(markup: string): HTMLElement {
    const templateEl: HTMLTemplateElement = document.createElement('template');
    templateEl.innerHTML = markup;

    return templateEl.content.cloneNode(true) as HTMLElement;
  }

  public static buildTemplate<T extends BaseObject>(
    strings: TemplateStringsArray,
    ...keys: string[]
  ): (obj: T) => string {
    return ((obj: T): string => keys.reduce((result: string, key: string, i: number) => `
    ${result}${convertToString(obj[key])}${strings[i + 1]}
    `, strings[0]));
  }
}
