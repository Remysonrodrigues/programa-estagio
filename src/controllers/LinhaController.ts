import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Linha from '@models/Linha'
import Parada from '@models/Parada'

class LinhaController {
  async get (req: Request, res: Response) {
    try {
      const { id } = req.params
      const linhaRepository = getRepository(Linha)

      const linha = await linhaRepository.findOne(id, { relations: ['paradas'] })
      if (!linha) {
        return res.status(400).json({ message: 'Line Not Found' })
      }

      linha.paradas.forEach(parada => {
        delete parada.linhas
      })

      return res.status(200).json(linha)
    } catch (err) {
      console.log('error: ' + err.message)
      return res.status(400).send()
    }
  }

  async getAll (req: Request, res: Response) {
    try {
      const linhaRepository = getRepository(Linha)

      const linhas = await linhaRepository.find({ relations: ['paradas'] })
      if (!linhas) {
        return res.status(400).json({ message: 'Lines Not Found' })
      }

      linhas.forEach((linha) => {
        linha.paradas.forEach(parada => {
          delete parada.linhas
        })
      })

      return res.status(200).json(linhas)
    } catch (err) {
      console.log('error: ' + err.message)
      return res.status(400).send()
    }
  }

  async create (req: Request, res: Response) {
    try {
      const { name } = req.body
      const linhaRepository = getRepository(Linha)

      const linha = new Linha()
      linha.name = name

      await linhaRepository.manager.save(linha)
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
      const { name } = req.body
      const linhaRepository = getRepository(Linha)

      const linha = await linhaRepository.findOne(id)
      if (!linha) {
        return res.status(400).json({ message: 'Line Not Found' })
      }

      linha.name = name

      await linhaRepository.manager.save(linha)
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
      const linhaRepository = getRepository(Linha)

      const linha = await linhaRepository.findOne(id, { relations: ['paradas'] })
      if (!linha) {
        return res.status(400).json({ message: 'Line Not Found' })
      }

      if (linha.paradas) {
        linha.paradas.forEach(async parada => {
          if (parada.linhas.length === 1) {
            await getRepository(Parada).manager.remove(parada)
          }
        })
      }

      await linhaRepository.manager.remove(linha)
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err))
    } catch (err) {
      console.log('error: ' + err.message)
      return res.status(400).send()
    }
  }
}

export default new LinhaController()
