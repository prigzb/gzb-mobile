function getNum(item, status) {
  return item.map(function(obj) {
    var robj = {}
    if (status == 0) {
      robj = obj.table_engagenum
    } else if (status == 1) {
      robj = obj.table_subscnum
    } else if (status == 2) {
      robj = obj.table_signnum
    } else {
      robj = obj.table_backmoneynum
    }
    return robj
  })
}

function getAmount(item, status) {
  return item.map(function(obj) {
    let robj = {}
    if (status == 0) {
      robj = obj.table_engageamount
    } else if (status == 1) {
      robj = obj.table_subscamount
    } else if (status == 2) {
      robj = obj.table_signamount
    } else {
      robj = obj.table_backmoneyamount
    }
    return robj
  })
}
// 获取预订的图表数据
export const yudingNum = item => getNum(item, 0)

export const yudingAmount = item => getAmount(item, 0)

// 获取认购的图表数据
export const rengouNum = item => getNum(item, 1)

export const rengouAmount = item => getAmount(item, 1)

// 获取签约的图表数据
export const qianyueNum = item => getNum(item, 2)

export const qianyueAmount = item => getAmount(item, 2)

// 获取回款的图表数据
export const huikuanNum = item => getNum(item, 3)

export const huikuanAmount = item => getAmount(item, 3)
