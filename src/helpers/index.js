const countObjectProperties = function (obj) {
  if (typeof obj === 'object') {
    return Object.values(obj).length
  }
  return 0
}

export {
  countObjectProperties
}
