const ALPHABETS = [ 'a' ]
const CATEGORYS = [ 'orange', 'brown', 'green', 'blue', 'gold' ]

const loader = () => {
    const arr = []

    ALPHABETS.forEach(alphabet => {
        const ob = {}

        CATEGORYS.forEach(category => {
            ob[category] = require(`../cards/${alphabet}/${category}.json`).cards
        })

        arr[alphabet] = ob
    })

    return arr
}

export { loader }