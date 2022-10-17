import { FormEvent, useState } from 'react'
import server from '../../constants/urlEnvironment'
import Campo from './campo'
import styles from './form.module.css'

const valoresIniciales = {
  _id: '',
  nombre: '',
  apellido: '',
}

interface formularioProps {}

const Formulario = ({}: formularioProps) => {
  const [usuario, setUsuario] = useState(valoresIniciales)

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setUsuario({
      ...usuario,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const reset = () => {
    setUsuario(valoresIniciales)
  }

  const create_user = async () => {
    await fetch(`${server}/api`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
      }),
    })
    reset()
  }
  const read_user = async () => {
    await fetch(`${server}/api/${usuario._id}`)
      .then((res) => res.json())
      .then((data) => setUsuario(data))
  }
  const update_user = async () => {
    await fetch(`${server}/api/${usuario._id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(usuario),
    })
    reset()
  }
  const delete_user = async () => {
    await fetch(`${server}/api/${usuario._id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })
    reset()
  }

  return (
    <form className={styles.formulario} onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <Campo
          id="_id"
          label="ID:"
          value={usuario._id}
          onChange={handleChange}
        />
        <Campo
          id="nombre"
          label="Nombre:"
          value={usuario.nombre}
          onChange={handleChange}
        />
        <Campo
          id="apellido"
          label="Apellido:"
          value={usuario.apellido}
          onChange={handleChange}
        />
      </div>
      <div className={styles.botones}>
        <button className={styles.boton} onClick={create_user}>
          Añadir
        </button>
        <button className={styles.boton} onClick={read_user}>
          Buscar
        </button>
        <button className={styles.boton} onClick={update_user}>
          Modificar
        </button>
        <button className={styles.boton} onClick={delete_user}>
          Eliminar
        </button>
      </div>
    </form>
  )
}

export default Formulario
