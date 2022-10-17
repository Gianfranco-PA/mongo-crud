import { NextApiRequest, NextApiResponse } from 'next'
import Usuario, { User } from '../../src/api/UsuarioModel'
import { dbConnect } from '../../src/api/mongo'
import mongoose from 'mongoose'

dbConnect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>,
) {
  const {
    method,
    body,
    query: { id },
  } = req

  switch (method) {
    case 'GET':
      try {
        const one = await Usuario.findById(id)
        if (!one) return res.status(404).json({ msg: 'No se encontro el Dato' })
        return res.status(200).json(one)
      } catch (error) {
        const msg = (error as Error).message
        return res.status(400).json({ msg })
      }
    case 'PUT':
      const session = await mongoose.startSession()
      try {
        session.startTransaction()
        const one = await Usuario.findByIdAndUpdate(id, body, {
          new: true,
          session,
        })
        await session.commitTransaction()
        if (!one) return res.status(404).json({ msg: 'No se encontro el Dato' })
        return res.status(200).json(one)
      } catch (error) {
        const msg = (error as Error).message
        await session.abortTransaction()
        return res.status(400).json({ msg })
      }
    case 'DELETE':
      const session1 = await mongoose.startSession()
      try {
        session1.startTransaction()
        const one = await Usuario.findByIdAndDelete(id, { session: session1 })
        await session1.commitTransaction()
        if (!one) return res.status(404).json({ msg: 'No se encontro el Dato' })
        return res.status(204).json({ msg: 'Se elimino correctamente' })
      } catch (error) {
        const msg = (error as Error).message
        await session1.abortTransaction()
        return res.status(400).json({ msg })
      }
    default:
      return res.status(400).json({ msg: 'Este metodo no esta implementado' })
  }
}
