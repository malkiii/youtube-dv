import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import Router from './router';

import i18n from './lib/i18n';
import { I18nextProvider } from 'react-i18next';

export function render(path: string) {
  i18n.changeLanguage(path.split('/')[0]);

  return {
    html: ReactDOMServer.renderToString(
      <I18nextProvider i18n={i18n}>
        <StaticRouter location={`/${path}`}>
          <Router />
        </StaticRouter>
      </I18nextProvider>,
    ),
  };
}
