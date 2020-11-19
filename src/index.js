import './scss/index.scss';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table]
});
// next lesson: https://vladilen.ru/pl/teach/control/lesson/view?id=161420899
excel.render();