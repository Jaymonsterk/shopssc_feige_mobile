 /**
 * 手机号中间以星号代替
 * @param {*} phone
 */
export function encodePhone (phone) {
  return String(phone).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 格式化成金钱格式
 * @param {*} money
 */
export function money (money) {
  return cutStr(money).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}

/* 
 *格式化万字
 */
export function calNum (val) {
    let num = parseFloat(val)
    let number
    if (num < 10000) {
        number = num
    } else {
        number = (num / 10000).toFixed(1) + 'W'
    }
    return number
}
/**
 * 格式化百分比
 */
export function percent (val) {
  return cutStr(val) + '%' || ''
}

/**
 * 百分比左部分
 */
export function percentLeft (val) {
  return cutStr(val).split('.')[0] || ''
}

/**
 * 百分比右部分
 */
export function percentRight (val) {
  return cutStr(val).split('.')[1] || ''
}
/**
 * 保留两位小数
 */
export function toFixed (val) {
  return cutStr(val)
}

/**
 * 保留1位小数
 */
export function toFixedOne (val) {
  let str = cutStr(val)
  let lastStr = str.charAt(str.length - 1)
  if (Number(lastStr) > 0) {
    return str
  } else {
    return str.substr(0, str.length - 1)
  }
}

/**
 * 格式化利率一位小数点不带%
 */
export function TorateOne (val) {
  return Number(val).toFixed(1)
}

/**
 * 获取银行卡尾号
 */
export function lastNo (val) {
  const str = String(val)
  return str.substr(str.length - 4, 4)
}

/**
 * 截取两位小数
 */
export function cutStr (val) {
  const newVal = val || 0
  let arr = Number(newVal).toFixed(3).split('.')
  return arr[0] + '.' + arr[1].substring(0, 2)
}

//渠道类型名称
export function shopType (type) {
	let typestr = ''
	switch(type) {
	    case 'B':
	        typestr = '天猫'
	        break;
	    case 'C':
	        typestr = '淘宝'
	        break;
	    default:
	        typestr = ''
	} 
	return typestr
}


// 转换文字
 /**数字转整数 如 10000 转为1万
 * @param {需要转化的数} num 
 * @param {需要保留的小数位数} 1 
 */
export function tranNumber (nubers) {
	if (!nubers) return '0'
	let numStr = nubers.toString()
	// 十万以内直接返回 
	if (numStr.length < 5) {
		return numStr;
	}else if (numStr.length >= 5) {//大于6位数是十万 (以10W分割 10W以下全部显示)
		let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + 1)
		return parseInt(numStr / 10000) + '.' + decimal;
	}
	
}

// 时间戳  Y + M + D + h + m + s;
export function format(timestamp) {
    let date;
    if((timestamp + '').length == "10"){
        date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    }
    else{
        date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    }
	var Y = date.getFullYear() + "-";
	var M =
	  (date.getMonth() + 1 < 10
		? "0" + (date.getMonth() + 1)
		: date.getMonth() + 1) + "-";
	var D = date.getDate();
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	if(D >=0 && D <=9) {
		D = '0' + D
	}
	if(h >=0 && h <=9) {
		h = '0' + h
	}
	if(m >=0 && m <=9) {
		m = '0' + m
	}
	if(s >=0 && s <=9) {
		s = '0' + s
	}
	return Y + M + D + " " + h + ":" + m + ":" + s ;
}
// 时间戳  M + D  月 / 日
export function formatMD(timestamp) {
	let date;
	if((timestamp + '').length == "10"){
	    date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	}
	else{
	    date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	}
	var Y = date.getFullYear() + "-";
	var M =
	  (date.getMonth() + 1 < 10
		? "0" + (date.getMonth() + 1)
		: date.getMonth() + 1) + "/";
	var D = date.getDate() + " ";
	var h = date.getHours() + ":";
	var m = date.getMinutes() + ":";
	var s = date.getSeconds();
	// return Y + M + D + h + m + s;
	return Y + M + D;
}
// 日期格式化
export function formatDate(date) {
    const dateTime = new Date(date);
    const YY = dateTime.getFullYear();
    const MM =
      dateTime.getMonth() + 1 < 10
        ? '0' + (dateTime.getMonth() + 1)
        : dateTime.getMonth() + 1;
    const D =
      dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate();
    const hh =
      dateTime.getHours() < 10
        ? '0' + dateTime.getHours()
        : dateTime.getHours();
    const mm =
      dateTime.getMinutes() < 10
        ? '0' + dateTime.getMinutes()
        : dateTime.getMinutes();
    const ss =
      dateTime.getSeconds() < 10
        ? '0' + dateTime.getSeconds()
        : dateTime.getSeconds();
    return `${YY}-${MM}-${D} ${hh}:${mm}:${ss}`;
}
/* 
 *时间格式化 倒序时间(刚刚，几分钟前，几个小时前，几天前，几周前，几个月前等)
 */
export function before_time(dateTimeStamp) {
	let result;
	var mistiming=Math.round(new Date() / 1000)-dateTimeStamp;
	    var arrr = ['年','个月','星期','天','小时','分钟','秒'];
	    var arrn = [31536000,2592000,604800,86400,3600,60,1];
	    for(var i=6;i>=0;i--){
	        var inm = Math.floor(mistiming/arrn[i]);
	        if(inm!=0){
	            result = inm+arrr[i]+'前';
	        }
	    }
	return result;
}
