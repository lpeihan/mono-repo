import { message } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';

import { copyToClipboard } from '../utils/clipboard';

export function useClipboard() {
  const { t } = useI18n();

  const copy = async (text, successText = t('common.copied')) => {
    await copyToClipboard(text);

    message.success(successText);
  };

  return {
    copy,
  };
}
