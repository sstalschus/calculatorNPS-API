import { Connection, createConnection, getConnectionOptions } from 'typeorm'

/**
 * Verifica se é um comando de teste
 * ou se é um comando de produção
 */
export default async (): Promise<Connection> => {

  const defaultOptions = await getConnectionOptions()

  return createConnection(
    Object.assign(defaultOptions, {
      database: process.env.NODE_ENV === 'test' ? './src/database/database.test.sqlite' : defaultOptions.database
    })
  )
}