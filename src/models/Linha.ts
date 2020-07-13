import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Parada } from './Parada'

@Entity('linhas')
export class Linha {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(type => Parada, parada => parada.linha)
  paradas: Parada[]
}
