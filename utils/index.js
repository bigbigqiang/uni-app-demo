import {
	Base64
} from './Base64'

/*
 * 日期转换函数
 * @parameter format: string -> yyyy-MM-dd | yyyy/MM/dd | yyyy-MM-dd hh:mm:ss | yyyy/MM/dd hh:mm:ss
 * @return: string
 * @E.g: new Date().Format("yyyy/MM/dd") 2019/03/26
 */

export const DateFormat = () => {
	Date.prototype.Format = function(format) {
		var o = {
			"M+": this.getMonth() + 1, // 月份
			"d+": this.getDate(), // 日
			"h+": this.getHours(), // 小时
			"m+": this.getMinutes(), // 分
			"s+": this.getSeconds() // 秒
		};
		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
			}
		}
		return format
	}
}

/*
 * 判断是否是中文字符
 * @parameter str: string
 * @return: string
 */

export const isChinese = (str) => {
	if (escape(str).indexOf("%u") < 0) return false
	return true
}

/*
 * 获取当前页面路由
 * @parameter: null
 * @return: url：string
 */

export const getCurrentPageUrl = () => {
	let pages = uni.getCurrentPages()
	let currentPage = pages[pages.length - 1]
	let url = currentPage.route
	return url
}

/*
 * 数字格式化 小于10 前面加 0
 * @parameter n：number|string
 * @return: string
 */

export const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

/*
 * 获取某月的第一天和最后一天
 * @parameter format: string; year: number; month：number
 * @return: Object {firstDay: string; lastDay: string}
 * @E.g: getMonthFirstOrLaseDay("yyyy/MM/dd", 2019, 12)
 */

export const getMonthFirstOrLaseDay = (format, year = new Date().getFullYear(), month = new Date().getMonth() + 1) => {
	new Date().Format || DateFormat()
	if (month > 12 || month < 1) {
		return console.error('getMonthFirstOrLaseDay', '传入的月份不正确')
	}
	return {
		firstDay: new Date(year, month - 1, '01').Format(format),
		lastDay: new Date(year, month, 0).Format(format)
	}
}

/*
 * Storage 管理
 * .get @parameter string @return string | null
 * .set @parameter obj @return undefind
 * .clear @parameter null @return undefind
 */
export const CacheManager = {
	storageToken: '6ae7547060a7341a3274182c4ba5f025',
	get(key) {
		let resultEncode = uni.getStorageSync(this.storageToken)
		if (resultEncode) {
			let result = JSON.parse(resultEncode)
			return key ? (result[key] || null) : result
		} else {
			return null
		}
	},
	set(obj) {
		let originCache = this.get() || {};
		uni.setStorageSync(this.storageToken, JSON.stringify({
			...originCache,
			...obj
		}))
	},
	clear() {
		uni.clearStorageSync()
	}
}

/*
 * 校验手机号
 * @parameter phone: string; 
 * @return:  Boolean
 */

export const checkPhone = (phone) => {
	return /^1[0-9]{1}[0-9]{9}$/.test(phone.trim())
}

/*
 * 校验邮箱
 * @parameter email: string; 
 * @return:  Boolean
 */

export const checkEmail = (email) => {
	return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email.trim())
}
