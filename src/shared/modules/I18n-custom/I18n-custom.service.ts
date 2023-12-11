import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService, TranslateOptions } from 'nestjs-i18n';

// @Description
// This Custom Service Used For Don't reuse {lang: I18nContext.current().lang} for every message_key
@Injectable()
export class I18nCustomService {
  constructor(private readonly i18n: I18nService) {}

  t(message_key: string, options?: Omit<TranslateOptions, 'lang'>) {
    const lang: string = I18nContext.current().lang;
    return this.i18n.t(message_key, { lang, ...options });
  }
}
