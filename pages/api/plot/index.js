import dbConnect from '../../../lib/dbConnect'
import Plot from '../../../models/Plot'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const plot = await Plot.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: plot })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const plot = await Plot.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: plot })
      } catch (error) {
        res.status(400).json({ success: error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
