import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmissionTable } from './entities/submission.entity';
import { Repository } from 'typeorm';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { SearchSubmissionDto } from './dto/search-submission.dto';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(SubmissionTable)
    private readonly submissionsRepository: Repository<SubmissionTable>,
  ) {}

  async getSubmissions() {
    return await this.submissionsRepository.find();
  }

  async getSubmissionByUserName(userName: string) {
    return await this.submissionsRepository.findOne({
      where: { user: { name: userName } },
    });
  }

  async createSubmission(createSubmissionDto: CreateSubmissionDto) {
    const submission = this.submissionsRepository.create(createSubmissionDto);
    return await this.submissionsRepository.save({
      ...submission,
      user: { id: createSubmissionDto.userId },
      problem: { id: createSubmissionDto.problemId },
    });
  }

  async isExist(hashedCode: string) {
    return await this.submissionsRepository.findOne({
      where: { codeHash: hashedCode },
    });
  }

  async paginateSubmissions(userName, page: number, limit: number = 5) {
    return await this.submissionsRepository.find({
      where: { user: { name: userName } },
      skip: page * limit,
      take: limit,
      order: { id: 'DESC' },
    });
  }

  async getCountOfSubmissions() {
    return await this.submissionsRepository.count();
  }

  async getLastSubmission(searchSubmissionDto: SearchSubmissionDto) {
    const promises = [];

    searchSubmissionDto.problemIds.forEach((problemId) => {
      const lastSubmission = this.submissionsRepository.findOne({
        where: {
          problem: { id: problemId },
          user: { name: searchSubmissionDto.userName },
        },
        order: { id: 'DESC' },
      });

      promises.push(lastSubmission);
    });

    return await Promise.all(promises);
  }
}
