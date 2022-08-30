import React from 'react';
import PropTypes from 'prop-types';

export class Screen extends React.Component {
    static SRCEEN_MAX_LEN = 6
    static propTypes = {
        text: PropTypes.string
    }
    render() {
        const text = this.props.text
        const len = Screen.SRCEEN_MAX_LEN
        const numbers = Array(len)
        for(let i = 0; i < len; i++) {
            numbers[i] = <Digital
                number={text[text.length - len + i] ?? ''}
                key={i}
            />
        }
        return <div className="screen">{numbers}</div>
    }
}

class Digital extends React.Component {
    static TOP_MAP =  {
        0: [0, 1, 2],
        1: [2],
        2: [1, 2, 3],
        3: [1, 2, 3],
        4: [0, 2, 3],
        5: [0, 1, 3],
        6: [0, 1, 3],
        7: [1, 2],
        8: [0, 1, 2, 3],
        9: [0, 1, 2, 3],
        H: [0, 2, 3],
        E: [0, 1, 3],
        L: [0],
        O: [0, 1, 2],
    }
    static BOTTOM_MAP = {
        0: [0, 2, 3],
        1: [2],
        2: [0, 1, 3],
        3: [1, 2, 3],
        4: [1, 2],
        5: [1, 2, 3],
        6: [0, 1, 2, 3],
        7: [2],
        8: [0, 1, 2, 3],
        9: [1, 2, 3],
        H: [0, 1, 2],
        E: [0, 1, 3],
        L: [0, 3],
        O: [0, 2, 3],
    }
    static propTypes = {
        number: PropTypes.string
    }
    render() {
        return <div className="digital">
            <div className="digital__dot"></div>
            <div className={this.className(this.props.number, 'top')}></div>
            <div className={this.className(this.props.number, 'bottom')}></div>
        </div>
    }

    className(number, type) {
        let namekey
        let className
        if(type === 'top') {
            className = 'digital__top digital__item';
            namekey = 'TOP_MAP';
        } else {
            className = 'digital__bottom digital__item';
            namekey = 'BOTTOM_MAP';
        }
        for(const id of Digital[namekey][number] ?? []) {
            className += ` active-${id}`
        }
        return className
    }
}