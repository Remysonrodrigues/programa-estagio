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

  @OneToOne(type => Veiculo, veiculo => veiculo.posicao)
  @JoinColumn()
  veiculo: Veiculo

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updateAt: Date
}
