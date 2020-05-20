/*
 * @Author: your name
 * @Date: 2020-01-16 13:44:14
 * @LastEditTime: 2020-05-20 10:57:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \WXPlugin\plugin\api\data.js
 */
const untils = require('../lib/untils')

function getData() {
  return untils.getStorage('cofigData')
}

function setData(value) {
  return untils.setStorage('configData', value)
}

module.exports = {
  getData: getData,
  setData: setData
}