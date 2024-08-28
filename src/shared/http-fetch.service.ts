import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpFetchService {
  constructor(private readonly httpService: HttpService) {}

  async get(url: string) {
    const result = await firstValueFrom(this.httpService.get(url));
    return result.data;
  }
}
