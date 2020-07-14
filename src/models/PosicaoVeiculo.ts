import { Entity, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm'
import Veiculo from './Veiculo'

@Entity('posicaoVeiculos')
export default class PosicaoVeiculo {
  @PrimaryGeneratedColumn()
  id: number

  @Column('double precision')
  lat: number

  @Column('double precision')
  lon: number

  @OneToOne(type => Veiculo)
  @JoinColumn()
  veiculo: Veiculo

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updateAt: Date
}
