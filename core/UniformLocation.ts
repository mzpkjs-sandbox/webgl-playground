import Context from "./Context"
import ShaderProgram from "./ShaderProgram"
import Resource from "./Resource"



class UniformLocation implements Resource<WebGLUniformLocation> {
    private readonly _context: Context
    private readonly _program: ShaderProgram
    private readonly _symbol: string
    private readonly _resource: WebGLUniformLocation

    public constructor(context: Context, program: ShaderProgram, symbol: string, size: number) {
        this._context = context
        this._program = program
        this._symbol = symbol
        const location = this._context.getUniformLocation(this._program.resource(), this._symbol)
        if (location !== null) {
            this._resource = location
        } else {
            throw new Error(`Could not locate an uniform variable defined as "${this._symbol}" in a given shader program.`)
        }
    }

    public resource(): WebGLUniformLocation {
        return this._resource
    }

    public get symbol(): string {
        return this._symbol
    }
}



export default UniformLocation