import { NextApiRequest, NextApiResponse } from 'next'
import {
  deleteRequest,
  getRequestByID,
  putRequest,
} from '../../src/controlador/transacciones'

//dbConnect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const {
    method,
    body,
    query: { id },
  } = req

  switch (method) {
    case 'GET':
      const getR = await getRequestByID(id as string)
      const resultGet = 'data' in getR ? getR.data : getR.msg
      return res.status(getR.status).json(resultGet)
    case 'PUT':
      const putR = await putRequest(id as string, body)
      const resultPut = 'data' in putR ? putR.data : putR.msg
      return res.status(putR.status).json(resultPut)
    case 'DELETE':
      const deleteR = await deleteRequest(id as string)
      const resultDelete = 'data' in deleteR ? deleteR.data : deleteR.msg
      return res.status(deleteR.status).json(resultDelete)
    default:
      return res.status(400).json({ msg: 'Este metodo no esta implementado' })
  }
}
