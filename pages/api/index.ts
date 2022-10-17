import type { NextApiRequest, NextApiResponse } from 'next'
import Usuario, { User } from '../../src/api/UsuarioModel'
import { dbConnect } from '../../src/api/mongo'
import mongoose from 'mongoose'

dbConnect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>,
) {
  const { method, body } = req
  switch (method) {
    case 'GET':
      try {
        const all = await Usuario.find()
        return res.status(200).json(all)

        //return res.status(200).json({ msg: 'Hola' })
      } catch (error) {
        const msg = (error as Error).message
        return res.status(500).json({ msg })
      }
    case 'POST':
      const session = await mongoose.startSession()
      try {
        session.startTransaction()
        const newData = new Usuario(body)

        //newData.id = new Types.ObjectId()
        const savedData = await newData.save({ session })
        await session.commitTransaction()
        return res.status(201).json(savedData)
      } catch (error) {
        const msg = (error as Error).message
        await session.abortTransaction()
        return res.status(500).json({ msg })
      }
    default:
      return res.status(400).json({ msg: 'Este metodo no esta implementado' })
  }
}
