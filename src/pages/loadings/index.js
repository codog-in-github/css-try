import '../../utils'
import '../../style/index.less'
import '../../style/loadings.less'
import { stringNodeCreater } from './NodeCreater'

const main = () => {
    const app = document.getElementById('app')

    const iWantCreateLoadingCSSNums = 10
    const extraNode = [
        { children:[ '.half-circle' ], },
        { children:[ '.10' ]}
    ]

    for(let i=0; i<iWantCreateLoadingCSSNums; i++){
        const config = extraNode[i] ?? {}
        const { 
            beforeCreate = function () {},
            created = function () {},
            beforeMount = function () {},
            mounted = function () {},
            children = [],
        } = config

        beforeCreate()

        const loadingBox = document.createElement('div')
        try {
            for(const child of children){
                switch (typeof child){
                    case 'string':
                        loadingBox.appendChild(
                            stringNodeCreater(child)
                        )
                        break;
                    case 'number':
                        for(let i=0; i<child; i++){
                            const node = document.createElement('div')
                            loadingBox.appendChild(node)
                        }
                        break;
                    case 'object':
                       // TODO
                        break;
                    default:
                        throw new Error(`[Error]: Can't suppourt this type "${typeof child}"`)
                }
            }
        } catch (error) {
            console.warn(error)
        }

        created.apply(loadingBox)
        beforeMount.apply(loadingBox)

        loadingBox.classList.add('loading-style')
        loadingBox.classList.add(`loading-style-${i+1}`)
        app.appendChild(loadingBox)
    
        mounted.apply(loadingBox)
    }
}

document.ready(main)
