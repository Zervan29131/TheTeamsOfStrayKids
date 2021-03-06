// 放置与cat对象有关的函数
const utils = require('./utils.js');

// 常用的一些对象
const db = wx.cloud.database();
const coll_photo = db.collection('photo');

// 获取猫猫的封面图
// TODO(zing): 可以搞个缓存
async function getAvatar(cat_id, total) {
  if (!total || total === 0) {
    return undefined;
  }
  
  const qf = {
    cat_id: cat_id,
    verified: true,
    best: true
  };

  // TODO: 这里对于API调用的次数较多，需要修改
  var index = utils.randomInt(0, total);
  var pho_src = (await coll_photo.where(qf).skip(index).limit(1).get()).data;
  return pho_src[0];
}

// 消除“有新相片”提示
function getVisitedDate(cat_id) {
  const key = "visit-cat-" + cat_id;
  return new Date(wx.getStorageSync(key));
}
function setVisitedDate(cat_id) {
  const key = "visit-cat-" + cat_id;
  wx.setStorageSync(key, new Date());
}

export {
  getAvatar,
  getVisitedDate,
  setVisitedDate,
}