import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Formulario from '../src/components/form/formulario'
import Principal from '../src/components/layouts/principal'

const Home: NextPage = () => {
  return (
    <div>
      <Principal>
        <Formulario />
      </Principal>
    </div>
  )
}

export default Home
