import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany, OneToMany } from 'typeorm'
import Parada from './Parada'
import Veiculo from './Veiculo'

@Entity('linhas')
export default class Linha {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @ManyToMany(type => Parada, parada => parada.linhas, { cascade: true })
  @JoinTable()
  paradas: Parada[]

  @OneToMany(type => Veiculo, veiculo => veiculo.linha, { cascade: true })
  veiculos: Veiculo[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date
}
