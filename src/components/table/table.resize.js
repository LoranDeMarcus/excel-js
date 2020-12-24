import { $ } from '@core/DOM';

export default function resizeHandler(e, $root) {
    return new Promise(resolve => {
        const $resizer = $(e.target);
        const $parent = $resizer.closest('[data-type="resizable"]');
        const counter = $parent.data.col;
        const coords = $parent.getCord();
        const type = $resizer.data.resize;
        const sideProp = type === 'col' ? 'bottom' : 'right';
        let value;
        $resizer.css({
            opacity: 1,
            [sideProp]: '-2000px'
        });

        document.onmousemove = ev => {
            if (type  === 'col') {
                const delta = ev.pageX - coords.right;
                value = coords.width + delta;
                $resizer.css({right: `${-delta}px`});
            } else {
                const delta = ev.pageY - coords.bottom;
                value = coords.height + delta;
                $resizer.css({bottom: `${-delta}px`});
            }
        }

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;

            if (type  === 'col') {
                $root.findAll(`[data-col="${counter}"]`)
                    .forEach(elem => {
                        $(elem).css({width: `${value}px`});
                    });
            } else {
                $parent.css({height: `${value}px`})
            }

            resolve({
                value,
                id: type === 'col' ? $parent.data.col : null
            })

            $resizer.css({
                opacity: 0,
                bottom: 0,
                right: 0
            });
        }
    });
}