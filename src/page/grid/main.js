import { random } from '../../utils';
import './main.less'

const items = document.getElementsByClassName('grid-item');
for (let i = 0; i < items.length; i++) {
    items[i].children[0].innerHTML = i + 1
    items[i].children[1].style.backgroundColor =
        `rgb(${random(256)}, ${random(256)}, ${random(256)})`
}
