import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Veiculo from '@models/Veiculo'
import PosicaoVeiculo from '@models/PosicaoVeiculo'

class PosicaoVeiculoController {
  async get (req: Request, res: Response) {
    try {
      const { id } = req.params
      const veiculoRepository = getRepository(Veiculo)

      const veiculo = await veiculoRepository.findOne(id, { relations: ['posicao'] })
      if (!veiculo) {
        return res.status(400).json({ message: 'Vehicle Not Found' })
      }

      return res.status(200).json(veiculo.posicao)
    } catch (err) {
      console.log('error: ' + err.message)
      return res.status(400).send()
    }
  }

  async getAll (req: Request, res: Response) {
    try {
      const posicoes = await getRepository(PosicaoVeiculo)
        .createQueryBuilder('PosicaoVeiculo')
        .leftJoinAndSelect('PosicaoVeiculo.veiculo', 'veiculo')
        .getMany()
      return res.status(200).json(posicoes)
    } catch (err) {
      console.log('error: ' + err.message)
      return res.status(400).send()
    }
  }

  async create (req: Request, res: Response) {
    try {
      const { id } = req.params
      const veiculoRepository = getRepository(Veiculo)

      const veiculo = await veiculoRepository.findOne(id)
      if (!veiculo) {
        return res.status(400).json({ message: 'Vehicle Not Found' })
      }

      const { lat, lon } = req.body
      const posicao = new PosicaoVeiculo()
      posicao.lat = lat
      posicao.lon = lon
      posicao.veiculo = veiculo

      const posicaoRepository = getRepository(PosicaoVeiculo)
      await posicaoRepository.manager.save(posicao)
        .then(() => res.status(201).send())
        .catch(err => res.status(500).send(err))
    } catch (err) {
      console.log('error: ' + err.message)
      return res.status(400).send()
    }
  }

  async update (req: Request, res: Response) {
    try {
      const { id } = req.params
      const veiculoRepository = getRepository(Veiculo)

      const veiculo = await veiculoRepository.findOne(id, { relations: ['posicao'] })
      if (!veiculo) {
        return res.status(400).json({ message: 'Vehicle Not Found' })
      }

      if (veiculo.posicao) {
        const { lat, lon } = req.body
        veiculo.posicao.lat = lat
        veiculo.posicao.lon = lon

        await veiculoRepository.manager.save(veiculo)
          .then(() => res.status(204).send())
          .catch(err => res.status(500).send(err))
      }

      return res.status(400).json({ message: 'Vehicle position not registered' })
    } catch (err) {
      console.log('error: ' + err.message)
      return res.status(400).send()
    }
  }

  async remove (req: Request, res: Response) {
    try {
      const { id } = req.params
      const veiculoRepository = getRepository(Veiculo)

      const veiculo = await veiculoRepository.findOne(id, { relations: ['posicao'] })
      if (!veiculo) {
        return res.status(400).json({ message: 'Vehicle Not Found' })
      }

      if (veiculo.posicao) {
        const posicao = veiculo.posicao
        const posicaoRepository = getRepository(PosicaoVeiculo)
        await posicaoRepository.manager.remove(posicao)
          .then(() => res.status(204).send())
          .catch(err => res.status(500).send(err))
      }

      return res.status(400).json({ message: 'Vehicle position not registered' })
    } catch (err) {
      console.log('error: ' + err.message)
      return res.status(400).send()
    }
  }
}

export default new PosicaoVeiculoController()
