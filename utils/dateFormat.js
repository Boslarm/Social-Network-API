module.exports = {
    formatDate(date){
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`
    },
    formatTime(time){
        return `${new Date(time).toLocaleTimeString()}`
    }
}

//got this code from my study group