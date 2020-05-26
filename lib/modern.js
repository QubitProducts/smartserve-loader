module.exports = function modern () {
  try {
    return Boolean(eval('(async () => await true)()').then) // eslint-disable-line no-eval
  } catch (err) {
    return false
  }
}
