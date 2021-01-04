import { Router } from '@core/routes/Router';
import { DashboardPage } from '@/pages/DashboardPage';
import { ExcelPage } from '@/pages/ExcelPage';

import './scss/index.scss';

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage
});

// next lesson: https://vladilen.ru/pl/teach/control/lesson/view?id=161601852