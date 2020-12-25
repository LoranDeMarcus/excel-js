import { createStore } from '@core/createStore';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { rootReducer } from '@/redux/rootReducer';
import { storage } from '@core/utils';
import './scss/index.scss';

const store = createStore(rootReducer, storage('excel-state'));

store.subscribe(state => {
    storage('excel-state', state);
});

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
});

// next lesson: https://vladilen.ru/pl/teach/control/lesson/view?id=161422300

excel.render();