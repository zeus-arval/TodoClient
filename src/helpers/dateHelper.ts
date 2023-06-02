function formatNum(num: number){
    let numText = num.toString()
    return format(numText)
}

function format(num: string){
    if (num.length === 1){
        return `0${num}`
    } else{
        return num
    }
}

// Formats date to a YYYY-MM-DDThh:MM:ss.mmmZ
export function convertStringToDate(date: string){
    if (date === ''){
        return '0000-00-00T00:00:00.000Z'
    }

    let dateElements = date.split('-')
    return `${dateElements[0]}-${format(dateElements[1])}-${format(dateElements[2])}T00:00:00.000Z`
}

export function getFormattedDateNow(){
    let now = new Date(Date.now())
    let year = now.getFullYear()
    let month = now.getMonth()
    let day = now.getDay()

    return `${year}-${formatNum(month)}-${formatNum(day)}T${formatNum(now.getHours())}:${formatNum(now.getMinutes())}:${formatNum(now.getSeconds())}.${formatNum(now.getMilliseconds())}Z`
}

export function formatServerDateToClientDate(date: string){
    if (date === ''){
        return ''
    }

    return date.split('T')[0]
}

export function formatDate(date: string){
    if (date === ''){
        return ''
    }

    let dateTime = date.split('T')
    return dateTime[0].replaceAll('-', '/')
}