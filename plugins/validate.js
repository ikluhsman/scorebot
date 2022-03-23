export default ({ app }, inject) => {
  inject('isStringOnlyNumbers', (string) => {
    /* if letters are found in your string */
    const regExp = /[a-zA-Z]/g
    if (regExp.test(string)) {
      return false
    }
    /* ensure we have an actual number */
    const pointNum = parseInt(string)
    if (isNaN(pointNum)) {
      return false
    }
    return pointNum
  })
}
