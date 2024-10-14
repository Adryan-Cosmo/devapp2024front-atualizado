const gerenciarDatas = {   
    formatarData: function formatDate(date, format) {
        const map = {
            mm: date.getMonth() + 1,
            dd: date.getDate(),
            yy: date.getFullYear().toString().slice(-2),
            yyyy: date.getFullYear()
        }

        return format.replace(/mm|dd|yyyy|yyy/gi, matched => map[matched])
    }
}
export {gerenciarDatas};