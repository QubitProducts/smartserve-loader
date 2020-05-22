module.exports = function modern () {
  try {
    return Boolean(eval('(async () => await true)()').then)
  } catch (err) {
    return false
  }
}
