import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ConflictException, Injectable } from "@nestjs/common";
import { GuestCheck, GuestCheckStatus } from "./guest-check.entity";
import { CreateGuestCheckDto } from "./dto/create-guest-check";
import { Spot } from "../spots/spot.entity";
import { NotFoundException } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common";


@Injectable()
export class GuestCheckService {

  constructor(
    @InjectRepository(GuestCheck)
    private readonly guestCheckRepository: Repository<GuestCheck>,

    @InjectRepository(Spot)
    private readonly spotRepository: Repository<Spot>

  ) {}


  async create(dto: CreateGuestCheckDto): Promise<GuestCheck> {

    // Regra #1: Não se abre comanda em mesa inexistente.
    const spot = await this.spotRepository.findOneBy({
      id: dto.spotID,
      active: true
    });

    if (!spot) {
      throw new NotFoundException('Não foi encontrada uma mesa ativa com esse ID');
    }

    // Regra #2: Não se abre comanda em mesa que EXISTA uma comanda aberta.
    const opened = await this.guestCheckRepository.exists({
      where: { spot : { id: dto.spotID }, status: GuestCheckStatus.OPENED}
    });

    if (opened) {
      throw new ConflictException('A mesa já possui uma comanda em aberto');
    }

    // Se chegou aqui, deu boa.. Grava o registro
    const guestCkeck = this.guestCheckRepository.create({
      spot,
      status: GuestCheckStatus.OPENED
    });
    
    return this.guestCheckRepository.save(guestCkeck);

  }

   async findOne(id: string): Promise<GuestCheck> {
      const guestCheck = await this.guestCheckRepository.findOneBy({ id });
  
      if (!guestCheck) {
        throw new NotFoundException('Comanda não encontrada!');
      }
  
      return guestCheck;
    }

  async close(id: string): Promise<GuestCheck> {
    const guestCheck = await this.findOne(id);

    //Regra #: Só posso fechar uma comanda aberta
    if (guestCheck.status === GuestCheckStatus.CLOSED) {
      throw new BadRequestException('A comanda já está fechada');
    }

    //Regra #2: Não posso fechar uma comanda com pedidos que não foram entregues.
    //To_Do: Implementar isso depois (divída técnica)

    // Se chegou aqui, deu certo!
    guestCheck.status = GuestCheckStatus.CLOSED;

    return this.guestCheckRepository.save(guestCheck);
  }






}