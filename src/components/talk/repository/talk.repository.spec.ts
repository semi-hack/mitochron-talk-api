import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TalkRepository } from './talk.repository';
import { Talk, TalkDocument } from '../schema/talk.schema';
import { Model } from 'mongoose';
import { talkStub } from '../../../../test/stubs/talk.stub';

describe('TalkRepository', () => {
  let talkRepository: TalkRepository;
  let talkModel: Model<TalkDocument>;
  let talkDocument: TalkDocument;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TalkRepository,
        {
          provide: getModelToken('Talk'),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    talkRepository = module.get<TalkRepository>(TalkRepository);
    talkModel = module.get<Model<TalkDocument>>(getModelToken('Talk'));
  });

  describe('create', () => {
    it('should create a new talk', async () => {
      const talkData = talkStub();

      const result = await talkRepository.create(talkData);

      expect(talkModel.create).toHaveBeenCalledWith(talkData);
      expect(result).toEqual(talkDocument);
    });
  });

});






