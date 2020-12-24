import './scss/index.scss';
import { createStore } from '@core/createStore';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { rootReducer } from '@/redux/rootReducer';

const store = createStore(rootReducer, {
    colState: {}
});

store.subscribe(state => {
    console.log(state);
});

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
});
// next lesson: https://vladilen.ru/pl/teach/control/lesson/view?id=161422300
excel.render();