import Head from 'next/head'

interface layoutPrincipalProps {
  children: React.ReactNode
}

const Principal = ({ children }: layoutPrincipalProps) => {
  return (
    <>
      <Head>
        <title>G3-TAD</title>
        <meta name="author" content="G3" />
        <meta name="description" content="Ejemplo de CRUD" />
        <meta
          name="keywords"
          content="crud,G3,sistema distribuido,mongodb,mongodb atlas"
        />
      </Head>
      <main>{children}</main>
    </>
  )
}

export default Principal
