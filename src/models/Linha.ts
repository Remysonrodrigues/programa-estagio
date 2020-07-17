import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany } from 'typeorm'
import Parada from './Parada'

@Entity('linhas')
export default class Linha {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @ManyToMany(type => Parada, parada => parada.linhas, { cascade: true })
  @JoinTable()
  paradas: Parada[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
