import '@/utils'
import './main.less'
 
document.ready(() => {
    const card = document.getElementById('root')

    document.addEventListener('mousemove', moving)
    
    function moving (e) {
        console.log('e', e);
        const w = screen.width
        const h = screen.height
        const x = e.clientX
        const y = e.clientY
        const range = 90
        card.children[0].style.transform = `rotateY(${ (x / w - 0.5) * range }deg) rotateX(${ - (y / h - 0.5) * range }deg)`
        card.children[1].style.transform = `rotateY(${ (x / w - 0.5) * range - 90 }deg) rotate(${ (y / h - 0.5) * range }deg)`
        card.children[2].style.transform = `rotateY(${ (x / w - 0.5) * range + 90 }deg) rotate(${ - (y / h - 0.5) * range }deg)`
        card.children[3].style.transform = `rotateY(${ (x / w - 0.5) * range }deg) rotateX(${ - (y / h - 0.5) * range - 90}deg)`
        card.children[4].style.transform = `rotateY(${ (x / w - 0.5) * range }deg) rotateX(${ - (y / h - 0.5) * range + 90}deg)`
    }
    
})
