import moment from "jalali-moment";

const convertToJalali = function (date = null, format = "jYYYY/jMM/jDD", defaultDate = 'مشخص نشده است.' ) {
    return isDate(date) ? moment(date).locale('fa').format(format) : defaultDate ;
};
const convertNowToJalali = function (date = null, format = "jYYYY/jMM/jDD" ) {
    return isDate(date) ? moment(date).locale('fa').format(format) : moment(new Date()).locale('fa').format(format) ;
};

const convertToRelativedDateJalali = function (date = null, defaultDate = 'مشخص نشده است.' ) {
    return isDate(date) ? moment(date).locale('fa').fromNow() :  defaultDate;
};
const isDate = function (date = null ) {
    return !!(date && !(+(date)) && Date.parse(date));
};
export { convertToJalali, convertNowToJalali, convertToRelativedDateJalali };
