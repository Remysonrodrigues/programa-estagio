import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Linha from '@models/Linha'
import Parada from '@models/Parada'

class ParadaController {
  async get (req: Request, res: Response) {
    try {
      const { id, linhaId } = req.params
      const linhaRepository = getRepository(Linha)

      const linha = await linhaRepository.findOne({ where: { id: linhaId } })
      if (!linha) {
        return res.status(404).json({ message: 'Line Not Found' })
      }

      const paradaRepository = getRepository(Parada)
      const parada = await paradaRepository.findOne({ where: { id } })
      if (!parada) {
        return res.status(404).json({ message: 'Stop Not Found' })
      }

      parada.linhas.forEach((lin) => {
        if (lin.name === linha.name) {
          delete parada.linhas
          return res.status(200).json(parada)
        }
      })

      return res.status(404).json({ message: 'Line does not contain this stop' })
    } catch (err) {
      console.log('error: ' + err.message)
      return res.status(400).send()
    }
  }

  async getAll (req: Request, res: Response) {
    try {
      const { linhaId } = req.params
      const linhaRepository = getRepository(Linha)
      const linha = await linhaRepository.findOne(linhaId, { relations: ['paradas'] })
      if (!linha) {
        return res.status(404).json({ message: 'Line Not Found' })
      }

      const paradas = linha.paradas

      paradas.forEach(parada => {
        delete parada.linhas
      })

      return res.status(200).json(paradas)
    } catch (err) {
      console.log('error: ' + err.message)
      return res.status(400).send()
    }
  }

  async create (req: Request, res: Response) {
    try {
      const { linhaId } = req.params
      const { name, lat, lon } = req.body
      const linhaRepository = getRepository(Linha)

      const linha = await linhaRepository.findOne(linhaId, { relations: ['paradas'] })
      if (!linha) {
        return res.status(404).json('Line Not Found')
      }

      const paradaRepository = getRepository(Parada)
      const parada = await paradaRepository.findOne({ where: { name } })
      if (!parada) {
        const newParada = new Parada()
        newParada.name = name
        newParada.lat = lat
        newParada.lon = lon
        linha.paradas.push(newParada)
      } else {
        linha.paradas.push(parada)
      }

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
      const { name, lon, lat } = req.body
      const paradaRepository = getRepository(Parada)

      const parada = await paradaRepository.findOne(id)
      if (!parada) {
        return res.status(404).json({ message: 'Stop Not Found' })
      }
      parada.name = name
      parada.lat = lat
      parada.lon = lon

      await paradaRepository.save(parada)
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
      const paradaRepository = getRepository(Parada)

      const parada = paradaRepository.findOne(id)
      if (!parada) {
        return res.status(404).json({ message: 'Stop Not Found' })
      }

      await paradaRepository.delete(id)
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err))
      return res.status(200).send()
    } catch (err) {
      console.log('error: ' + err.message)
      return res.status(400).send()
    }
  }

  async linhasPorParada (req: Request, res: Response) {
    try {
      const { id } = req.params
      const paradaRepository = getRepository(Parada)
      const paradas = await paradaRepository
        .createQueryBuilder('Parada')
        .leftJoinAndSelect('Parada.linhas', 'linhas')
        .where('Parada.id = :id', { id })
        .getOne()

      return res.status(200).json(paradas.linhas)
    } catch (err) {
      console.log('error: ' + err.message)
      return res.status(400).send()
    }
  }
}

export default new ParadaController()
