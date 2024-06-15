import {TestingModule, Test} from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { UsersService } from '../../src/infra/modules/users/users.service';
import { DatabaseModule } from '../../src/infra/providers/database/database.module';



describe('Update user',  () => {

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

    it('Confere se o usuário foi atualizado corretamente', async() => {   
        const input= { 
            name: "Fulano",
            password: randomUUID(),
            role: 'admin',
        }
        await service.update('laura@gmail.com', input)
        const [user] = await service.findOne('laura@gmail.com')
        
  
        expect(user.name).toBe(input.name)
       
    })
})

