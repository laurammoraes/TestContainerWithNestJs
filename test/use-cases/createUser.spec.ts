import {TestingModule, Test} from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { UsersService } from '../../src/infra/modules/users/users.service';
import { PostgreSqlContainer } from '@testcontainers/postgresql'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { User } from 'aws-cdk-lib/aws-iam';
import { DatabaseModule } from '../../src/infra/providers/database/database.module';


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
        

       
        
    })

    it('Confere se o usuário esta sendo criado corretamente', async() => {

            

                const input = { 
                    
                    name: "Laura",
                    email: "laura@gideonsolutions.com.br",
                    password: randomUUID(),
                    role: 'admin',
                   
                }
        
                await service.create(input)
        
                const [user] = await service.findOne(input.email)
                console.log(user)
                expect(user.email).toBe(input.email)
               
               
               
          

    
        
        
    })

    afterAll(async() => {
        // await service.remove(userId)
    })
})

