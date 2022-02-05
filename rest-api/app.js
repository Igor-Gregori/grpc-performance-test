const express = require('express')
const app = express()
const port = 3001

app.get('/mult/:number', (req, res) => {
  const { number } = req.params;
  res.status(200).json({
    multByOne: 1 * number,
    multByTwo: 2 * number,
    multByThree: 3 * number,
    multByFour: 4 * number,
    multByFive: 5 * number,
    multBySix: 6 * number,
    multBySeven: 7 * number,
    multByEight: 8 * number,
    multByNine: 9 * number,
    multByTen: 10 * number,
  })
})

app.listen(port, () => {
  console.log(`REST API listening on port ${port}`)
})
