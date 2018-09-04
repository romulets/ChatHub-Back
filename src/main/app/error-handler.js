
export default (err, res, defaultStatus = 500) => {
  console.error(err)
  res.status(defaultStatus).send({message: err.message})
}