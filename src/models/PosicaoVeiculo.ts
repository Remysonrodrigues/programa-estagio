import { Entity, Column, OneToOne, JoinColumn } from 'typeorm'
import { Veiculo } from './Veiculo'

@Entity('posicao_veiculos')
export class PosicaoVeiculo {
  @Column('double')
  lat: number

  @Column('double')
  lon: number

  @OneToOne(type => Veiculo)
  @JoinColumn()
  veiculo: Veiculo
}
