import {TestingModule, Test} from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { UsersService } from '../../src/infra/modules/users/users.service';
import { PostgreSqlContainer } from '@testcontainers/postgresql'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { User } from 'aws-cdk-lib/aws-iam';
import { DatabaseModule } from '../../src/infra/providers/database/database.module';
const { GenericContainer } = require("testcontainers");
const { Client } = require("pg");


describe('Create User',  () => {
    
    // let app: TestingModule 
    let service: UsersService
    const userId = randomUUID()
    let moduleRef: TestingModule
    

    let postgresContainer;
    let postgresClient;

    beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
			imports: [DatabaseModule],
			providers: [
				UsersService
			],
		}).compile()
        service = moduleRef.get<UsersService>(UsersService)

        // 

       
        
    })

    it('Confere se o usuário esta sendo criado corretamente', async() => {
        try {
            // jest.setTimeout(30000);
            const container = await new PostgreSqlContainer('postgres:12-alpine').start();

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

                const input = { 
                    id: randomUUID(),
                    name: "Laura",
                    email: "laura@gideonsolutions.com.br",
                    password: randomUUID(),
                    role: 'admin',
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    deletedAt: null,
                }
        
                // await service.create(input)
        
                const [user] = await service.findOne('cf1cbbab-eb40-4bb8-a539-8a3b8d555203')
                console.log(user)
                expect(user.id).toBe(userId)

               
        
                await client.end()
            
           
        
            await container.stop();
          } catch (error) {
            console.error('Erro ao iniciar o PostgreSqlContainer:', error);
          }

    
        
        
    })

    afterAll(async() => {
        // await service.remove(userId)
    })
})

