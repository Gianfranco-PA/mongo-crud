import { Schema, model, models, Types, InferSchemaType } from 'mongoose'

const UsuarioSchema = new Schema({
  nombre: { type: 'string' },
  apellido: { type: 'string' },
})

const Usuario = models.Usuario || model('Usuario', UsuarioSchema)

export default Usuario

export type User = InferSchemaType<typeof Usuario>