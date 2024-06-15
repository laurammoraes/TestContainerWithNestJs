import { PostgreSqlContainer } from '@testcontainers/postgresql'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import fs from 'fs';

export default async function (){
    try {
		
		process.env.TYPE = 'test'
      	const container = await new PostgreSqlContainer('postgres:12-alpine').start();

		process.env.CONTAINER_USERNAME = container.getUsername()
		process.env.CONTAINER_PASSWORD = container.getPassword()
		process.env.CONTAINER_DATABASE = container.getDatabase()
		process.env.CONTAINER_HOSTNAME = container.getHost()
		process.env.CONTAINER_PORT = container.getPort().toString()

		const client = postgres({
					host: container.getHost(),
					port: container.getPort(),
					database: container.getDatabase(),
					user: container.getUsername(),
					password: container.getPassword(),
					max: 1,
			})
			

		const drizzleClient = drizzle(client)

		await migrate(drizzleClient, {
			migrationsFolder: 'drizzle',
		})

		const runSqlScript = async (client: any, filePath: string) => {
            const importSql = fs.readFileSync(filePath).toString();
            const sqlCommands = importSql.split(';').filter((command) => command.trim() !== '');

            for (const sql of sqlCommands) {
                await client.unsafe(sql);
            }
        };

        await runSqlScript(client, './test/import.sql');

		global.pgContainer = client 

		await client.end()


    } catch (error) {

		console.error(
		'Erro ao inicializar o container ou cliente PostgreSQL:',
		error
	)
        
    }
}