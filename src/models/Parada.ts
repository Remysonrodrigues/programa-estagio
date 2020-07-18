import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm'
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

  @ManyToMany(type => Linha, linha => linha.paradas, { eager: true })
  linhas: Linha[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date
}
