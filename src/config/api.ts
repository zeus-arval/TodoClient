export const apiConfig = () => {
    const VERSION: string = 'v1'
    const END_POINT: string = `https://taltech.akaver.com/api/${VERSION}/`

    return { version: VERSION, endPoint: END_POINT }
}