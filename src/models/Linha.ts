import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import Parada from './Parada'

@Entity('linhas')
export default class Linha {
  constructor (name: string) {
    this.name = name
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @OneToMany(type => Parada, parada => parada.linha, { cascade: true })
  paradas: Parada[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
