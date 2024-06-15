import {TestingModule, Test} from '@nestjs/testing';

import { UsersService } from '../../src/infra/modules/users/users.service';
import { DatabaseModule } from '../../src/infra/providers/database/database.module';


describe('Get all users ',  () => {
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

    it('Confere se a busca por todos os usuários cadastrados está sendo realizada corretamente', async() => {   
       
        const users = await service.findAll()
        expect(users.length).toBe(1)
       
    })
})

