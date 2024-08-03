

function log(message, everythingOk = true) {
    if (everythingOk) {
        console.log(`${('-').repeat(5)} ${message} ${('-').repeat(5)}`)
    } else {
        console.error(`error happened: ${message}`)
    }
}

export default log