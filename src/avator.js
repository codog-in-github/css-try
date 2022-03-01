import './utils'
import './style/index.less'
import './style/avator.less'

const main = () => {
    const app = document.getElementById('app')
    const avator = document.createElement('div')

    app.appendChild(avator)
    avator.classList.add('avator')
}

document.ready(main)
