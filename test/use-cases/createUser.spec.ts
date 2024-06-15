import {TestingModule, Test} from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { UsersService } from '../../src/infra/modules/users/users.service';
import { DatabaseModule } from '../../src/infra/providers/database/database.module';


describe('Create User',  () => {

    let service: UsersService
    let moduleRef: TestingModule

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
       
        expect(user.email).toBe(input.email)
       
    })
})

