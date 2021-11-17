
export const binToStr = (sequence: any) => {
    let text = ''
    for (let i = 0; i < sequence.length; i += 8) {
        text += String.fromCharCode(parseInt(sequence.substring(i, i + 8), 2))
    }

    return text
}