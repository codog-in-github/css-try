const TESTS = {
    node: /^[A-Za-z]+$/,
    class: /^\./,
    id: /^#/,
}

export const stringNodeCreater = createString => {
    if(TESTS.node.test(createString)){
        return document.createElement(createString)
    }

    const node = document.createElement('div')
    if(TESTS.class.test(createString)){
        node.classList.add(createString.substring(1))
        return node
    }

    if(TESTS.id.test){
        node.id = createString.substring(1)
        return node
    }
}