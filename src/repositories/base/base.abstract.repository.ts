import { DeleteResult, FindManyOptions, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { BaseInterfaceRepository } from './base.interface.repository';

export abstract class BaseAbstractRepository<T> implements BaseInterfaceRepository<T> {
  // protected repository: Repository<T>;

  // protected constructor(repository: Repository<T>) {
  //   this.repository = repository;
  // }

  // The Repository is injected through the class constructor, use private syntax.
  // This shorthand allows us to both declare and initialize the Repository
  protected constructor(private repository: Repository<T>) {}

  async create(data: T | any): Promise<T> {
    return await this.repository.save(data);
  }

  async findById(id: string): Promise<T> {
    return await this.repository.findOneBy({ id } as unknown as FindOptionsWhere<T>);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  async update(id: string, data: T | any): Promise<UpdateResult> {
    return await this.repository.update(id, data);
  }
}
