import { copyToClipboard } from '@packages/utils';
import { showToast } from 'vant';
import { useI18n } from 'vue-i18n';

export function useClipboard() {
  const { t } = useI18n();

  const copy = async (text, successText = t('common.copied')) => {
    await copyToClipboard(text);

    showToast(successText);
  };

  return {
    copy,
  };
}
