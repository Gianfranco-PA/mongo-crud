import type { NextApiRequest, NextApiResponse } from 'next'
import { getRequest, postRequest } from '../../src/controlador/transacciones'

//dbConnect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { method, body } = req
  switch (method) {
    case 'GET':
      const getR = await getRequest()
      const resultGet = 'data' in getR ? getR.data : getR.msg
      return res.status(getR.status).json(resultGet)
    case 'POST':
      const postR = await postRequest(body)
      const resultPost = 'data' in postR ? postR.data : postR.msg
      return res.status(postR.status).json(resultPost)
    default:
      return res.status(400).json({ msg: 'Este metodo no esta implementado' })
  }
}
