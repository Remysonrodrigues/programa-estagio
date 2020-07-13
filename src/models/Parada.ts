import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Linha } from './Linha'

@Entity('paradas')
export class Parada {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('double')
  lat: number

  @Column('double')
  lon: number

  @ManyToOne(type => Linha, linha => linha.paradas)
  linha: Linha
}
