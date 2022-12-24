import { DeleteResult, UpdateResult } from 'typeorm';

export interface BaseInterfaceRepository<T> {
  create(data: T): Promise<T>;
  findById(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  remove(id: string): Promise<DeleteResult>;
  update(id: string, data: T): Promise<UpdateResult>;
}
