function status (req, res) {
  res.status(200).json({ status: 'alunos estão acima da média' })
}

export default status