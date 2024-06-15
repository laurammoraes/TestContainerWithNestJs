import {TestingModule, Test} from '@nestjs/testing';

import { UsersService } from '../../src/infra/modules/users/users.service';
import { DatabaseModule } from '../../src/infra/providers/database/database.module';


describe('Get user ',  () => {

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

    it('Confere se a busca por um usuário está sendo realizada corretamente', async() => {   
       
        const [user] = await service.findOne('laurammoraes2@gmail.com')
        
        expect(user.email).toBe('laurammoraes2@gmail.com')
       
    })
})

