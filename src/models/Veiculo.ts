import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import { Linha } from './Linha'

@Entity('veiculos')
export class Veiculo {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  modelo: string

  @OneToOne(type => Linha)
  @JoinColumn()
  linha: Linha
}
