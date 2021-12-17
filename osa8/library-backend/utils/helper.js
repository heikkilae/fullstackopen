const removeDuplicates = array => {
  
  let uniqueElements = []

  array.forEach((element) => {
      if (element !== null || element !== '') {
        if (!uniqueElements.includes(element)) {
          uniqueElements.push(element)
        }
      }
  })

  return uniqueElements
}

module.exports = { removeDuplicates }