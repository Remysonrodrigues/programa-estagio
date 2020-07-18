import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Veiculo from '@models/Veiculo'
import Linha from '@models/Linha'

class VeiculoController {
  async get (req: Request, res: Response) {
    try {
      const { id } = req.params
      const veiculoRepository = getRepository(Veiculo)

      const veiculo = await veiculoRepository.findOne(id, { relations: ['linha'] })
      if (!veiculo) {
        return res.status(400).json({ message: 'Vehicle Not Found' })
      }

      return res.status(200).json(veiculo)
    } catch (err) {
      console.log('error: ' + err.message)
      return res.status(400).send()
    }
  }

  async getAll (req: Request, res: Response) {
    try {
      const veiculoRepository = getRepository(Veiculo)
      const veiculos = await veiculoRepository.find()
      return res.status(200).json(veiculos)
    } catch (err) {
      console.log('error: ' + err.message)
      return res.status(400).send()
    }
  }

  async create (req: Request, res: Response) {
    try {
      const { name, modelo, linha } = req.body
      const veiculoRepository = getRepository(Veiculo)

      const veiculo = new Veiculo()
      veiculo.name = name
      veiculo.modelo = modelo

      if (linha) {
        const linhaExist = await getRepository(Linha).findOne({ name: linha.name }, { relations: ['veiculos'] })
        if (linhaExist) {
          linhaExist.veiculos.push(veiculo)
          await getRepository(Linha).manager.save(linhaExist)
            .then(() => res.status(201).send())
            .catch(err => res.status(500).send(err))
        }
      }

      await veiculoRepository.manager.save(veiculo)
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
      const { name, modelo, linha } = req.body
      const veiculoRepository = getRepository(Veiculo)

      const veiculo = await veiculoRepository.findOne(id, { relations: ['linha'] })
      if (!veiculo) {
        return res.status(400).json({ message: 'Vehicle Not Found' })
      }

      veiculo.name = name
      veiculo.modelo = modelo

      if (linha) {
        const linhaExist = await getRepository(Linha).findOne({ name: linha.name }, { relations: ['veiculos'] })
        if (linhaExist) {
          veiculo.linha = linhaExist
          linhaExist.veiculos.push(veiculo)
          await getRepository(Linha).manager.save(linhaExist)
            .then(() => res.status(201).send())
            .catch(err => res.status(500).send(err))
        }
      }

      await veiculoRepository.manager.save(veiculo)
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err))
    } catch (err) {
      console.log('error: ' + err.message)
      return res.status(400).send()
    }
  }

  async remove (req: Request, res: Response) {
    try {
      const { id } = req.params
      const veiculoRepository = getRepository(Veiculo)

      const veiculo = await veiculoRepository.findOne(id)
      if (!veiculo) {
        return res.status(400).json({ message: 'Vehicle Not Found' })
      }

      await veiculoRepository.manager.remove(veiculo)
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err))
    } catch (err) {
      console.log('error: ' + err.message)
      return res.status(400).send()
    }
  }
}

export default new VeiculoController()
