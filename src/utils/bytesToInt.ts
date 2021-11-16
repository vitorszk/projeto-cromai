export const bytesToInt: any = (bytes: any) => {
    let result = 0

    result = result | (0xFF000000 & parseInt(bytes[3]) << 24)
    result = result | (0x00FF0000 & parseInt(bytes[2]) << 16)
    result = result | (0x0000FF00 & parseInt(bytes[1]) << 8)
    result = result | (0x000000FF & parseInt(bytes[0]) << 0)

    return result
}
