import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import Linha from './Linha'

@Entity('veiculos')
export default class Veiculo {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  modelo: string

  @OneToOne(type => Linha)
  @JoinColumn()
  linha: Linha

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
