import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { Linha } from './Linha'

@Entity('paradas')
export class Parada {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('double precision')
  lat: number

  @Column('double precision')
  lon: number

  @ManyToOne(type => Linha, linha => linha.paradas)
  linha: Linha

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
