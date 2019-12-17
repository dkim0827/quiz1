const dateHelper = function (date) {
    const milliseconds = Date.now() - date;
    const sec = Math.round(milliseconds / 1000)
    const min = Math.round(sec / 60)
    const hour = Math.round(min / 60)
    const day = Math.round(hour / 24)
    const month = Math.round(day / 30)
    const year = Math.round(month / 12)
    console.log(sec, min, hour, day)
    if (year > 0) {
        return year + " years ago"
    } else if (month > 0) {
        return month + " months ago"
    } else if (day > 0) {
        return day + " days ago"
    } else if (hour > 0) {
        return hour + " hours ago"
    } else if (min > 0) {
        return min + " min ago"
    } else {
        return "now"
    }
}

module.exports = dateHelper