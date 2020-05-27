module.exports = function modern () {
  try {
    return Boolean(eval('()=>{}')) // eslint-disable-line no-eval
  } catch (err) {
    return false
  }
}
