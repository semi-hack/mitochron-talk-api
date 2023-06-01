import { Test } from '@nestjs/testing';
import { Talk, TalkDocument } from '../schema/talk.schema';
import { TalkService } from '../service/talk.service';
import { TalkController } from '../controller/talk.controller';
import { AttendeeService } from '../../attendee/service/attendee.service';
import { MockAttendeeService } from '../../../../test/mocks/attendee.service.mock';
import { TalkRepository } from '../repository/talk.repository';
import { TalkModel } from '../../../../test/models/talk.model';
import { talkStub } from '../../../../test/stubs/talk.stub';

// jest.mock('../../tests/mocks/talk.mock')

describe('TalkService', () => {
  let talkService: TalkService;
  let talkRepo: TalkRepository;
  let attendeeService: AttendeeService;
  let talkDocument: TalkDocument;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TalkModel],
      controllers: [TalkController],
      providers: [
        TalkService,
        {
          provide: TalkRepository,
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
            findAllTalks: jest.fn(),
            updateTalk: jest.fn(),
            findOne: jest.fn(),
            deleteTalk: jest.fn(),
          },
        },
        {
          provide: AttendeeService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    })
      .overrideProvider(AttendeeService)
      .useValue(MockAttendeeService)
      .compile();

    talkService = module.get<TalkService>(TalkService);
    talkRepo = module.get<TalkRepository>(TalkRepository);
    attendeeService = module.get<AttendeeService>(AttendeeService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(talkService.createTalk).toBeDefined();
  });

  describe('createTalk', () => {
    it('should create a talk if it does not already exist', async () => {
      const input = talkStub();

      jest.spyOn(talkRepo, 'find').mockResolvedValueOnce([]);

      const result = await talkService.createTalk(input);

      expect(talkRepo.find).toHaveBeenCalledWith({ title: 'New Talk' });
      expect(talkRepo.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(talkDocument);
    });
  });

  describe('findTalkById', () => {
    it('should return the talk with the given ID', async () => {
      const talkId = '6477dee2350bfc910eba29c6';

      const result = await talkService.findTalkById(talkId);

      expect(talkRepo.findById).toHaveBeenCalledWith(talkId);
      expect(result).toEqual(talkDocument);
    });
  });

  describe('findAllTalk', () => {
    it('should return an array of all talks', async () => {
      const talks = [talkStub()];

      const result = await talkService.findAllTalk();

      expect(talkRepo.findAllTalks).toHaveBeenCalled();
    });
  });

});
