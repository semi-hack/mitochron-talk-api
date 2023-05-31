import { Test } from "@nestjs/testing"
import { TalkService } from "../service/talk.service"
import { TalkController } from "./talk.controller"

describe('TalkController', () => {
    beforeEach( async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [TalkController],
            providers: [TalkService]
        }).compile();
    })
})