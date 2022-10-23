import mongoose from 'mongoose'
import { dbConnect } from '../model/mongo'
import Usuario, { User } from '../model/UsuarioModel'

dbConnect()

export interface ErrorRequest {
  status: number
  msg: string
}

export interface CompleteRequest {
  status: number
  data: object
}

export async function getRequest(): Promise<CompleteRequest | ErrorRequest> {
  try {
    const all = await Usuario.find()
    return { status: 200, data: all }
  } catch (error) {
    const msg = (error as Error).message
    return { status: 500, msg }
  }
}

export async function getRequestByID(
  id: string,
): Promise<CompleteRequest | ErrorRequest> {
  try {
    const one = await Usuario.findById(id)
    if (!one) return { status: 404, msg: 'No se encontro el Dato' }
    return { status: 201, data: one }
  } catch (error) {
    const msg = (error as Error).message
    return { status: 400, msg }
  }
}

export async function postRequest(
  body: User,
): Promise<CompleteRequest | ErrorRequest> {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const newData = new Usuario(body)
    const savedData = await newData.save({ session })
    await session.commitTransaction()
    return { status: 201, data: savedData }
  } catch (error) {
    const msg = (error as Error).message
    await session.abortTransaction()
    return { status: 500, msg }
  }
}

export async function putRequest(
  id: string,
  body: User,
): Promise<CompleteRequest | ErrorRequest> {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const one = await Usuario.findByIdAndUpdate(id, body, {
      new: true,
      session,
    })
    if (!one) {
      await session.abortTransaction()
      return { status: 404, msg: 'No se encontro el Dato' }
    }
    await session.commitTransaction()
    return { status: 200, data: one }
  } catch (error) {
    const msg = (error as Error).message
    await session.abortTransaction()
    return { status: 400, msg }
  }
}

export async function deleteRequest(
  id: string,
): Promise<CompleteRequest | ErrorRequest> {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const one = await Usuario.findByIdAndDelete(id, { session })
    if (!one) {
      await session.abortTransaction()
      return { status: 404, msg: 'No se encontro el Dato' }
    }
    await session.commitTransaction()
    return { status: 204, data: one }
  } catch (error) {
    const msg = (error as Error).message
    await session.abortTransaction()
    return { status: 400, msg }
  }
}
