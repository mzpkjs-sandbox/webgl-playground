class Context {
    constructor(document: Document) {
        const element = document.createElement("canvas")
        document.body.append(element)
        element.width = 640
        element.height = 480
        const context = element.getContext("webgl2")
        if (context) {
            return context
        } else {
            throw new Error("?")
        }
    }
}


interface Context extends WebGL2RenderingContext {

}



export default Context