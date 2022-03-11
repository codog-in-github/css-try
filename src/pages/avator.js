import '../utils'
import '../style/index.less'
import '../style/avator.less'

const main = () => {
    const app = document.getElementById('app')
    const avator = document.createElement('div')
    const heightLight = document.createElement('div')

    app.appendChild(avator)
    avator.appendChild(heightLight)
    avator.classList.add('avator')
    heightLight.classList.add('h-l')
}

document.ready(main)
