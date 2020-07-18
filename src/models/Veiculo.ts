import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm'
import Linha from './Linha'
import PosicaoVeiculo from './PosicaoVeiculo'

@Entity('veiculos')
export default class Veiculo {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  modelo: string

  @ManyToOne(type => Linha, linha => linha.veiculos)
  linha: Linha

  @OneToOne(type => PosicaoVeiculo, posicao => posicao.veiculo, { cascade: true })
  posicao: PosicaoVeiculo

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date
}
