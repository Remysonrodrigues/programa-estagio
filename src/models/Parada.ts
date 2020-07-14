import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import Linha from './Linha'

@Entity('paradas')
export default class Parada {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @Column('double precision')
  lat: number

  @Column('double precision')
  lon: number

  @ManyToOne(type => Linha, linha => linha.paradas, { onDelete: 'CASCADE' })
  linha: Linha

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
