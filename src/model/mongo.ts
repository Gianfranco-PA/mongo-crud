import { connect, connection} from 'mongoose'

const conn = {
  isConnected: 0,
}

export async function dbConnect() {
  if (conn.isConnected == 1) return
  const db = await connect(process.env.MONGODB_URI!)
  db.connection.asPromise()
  conn.isConnected = db.connection.readyState
}

connection.on('connected', () => {
  console.log('Conectado a MongoDB')
})

connection.on('error', () => {
  console.error.bind(console, 'Error en conexion')
})
