import { talkStub } from "test/stubs/talk.stub";

export const TalkServices = jest.fn().mockReturnValue({
    findTalkById: jest.fn().mockResolvedValue(talkStub()),
    findAllTalk: jest.fn().mockResolvedValue([talkStub()]),
    createTalk: jest.fn().mockResolvedValue([talkStub()]),
})