export const ready = function (callback) {
    ///兼容FF,Google
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function () {
            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
            callback();
        }, false)
    }
     //兼容IE
    else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState == "complete") {
                document.detachEvent("onreadystatechange", arguments.callee);
                callback();
            }
        })
    }
    else if (document.lastChild == document.body) {
        callback();
    }
}

export const debounce = (func, delay = 500) => {
    let timmer
    return (...arg) => {
        clearTimeout(timmer)
        timmer = setTimeout(func, delay, ...arg)
    }
}

export const throttle = (func, delay = 500) => {
    let lock = false
    return (...arg) => {
        if (!lock) {
            lock = true
            setTimeout(() => {
                func(...arg)
                lock = false
            }, delay)
        }
    }
}

export const once = (func) => {
    let lock = false
    return (...arg) => {
        if(!lock) {
            lock = true
            func(...arg)
        }
    }
}