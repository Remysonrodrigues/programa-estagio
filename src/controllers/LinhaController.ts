import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Linha from '@models/Linha'

class LinhaController {
  async get (req: Request, res: Response) {
    const { id } = req.params
    const linha = await getRepository(Linha).findOne({ where: { id } })
    if (!linha) {
      return res.status(404).json({ message: 'Line Not Found' })
    }
    return res.status(200).json({ linha })
  }

  async getAll (req: Request, res: Response) {
    const linhas = await getRepository(Linha).find()
      .then((linhas) => res.status(200).json(linhas))
      .catch(err => res.status(500).send(err))
  }

  async create (req: Request, res: Response) {
    const { name } = req.body
    const linha = new Linha(name)
    await getRepository(Linha)
      .save(linha)
      .then(() => res.status(201).send())
      .catch(err => res.status(500).send(err))
  }

  async update (req: Request, res: Response) {
    const { id } = req.params
    if (!await getRepository(Linha).findOne({ where: { id } })) {
      return res.status(404).json({ message: 'Line Not Found' })
    }
    const { name } = req.body
    const linha = new Linha(name)
    await getRepository(Linha).update(id, linha)
      .then(() => res.status(200).send())
      .catch(err => res.status(500).send(err))
  }

  async remove (req: Request, res: Response) {
    const { id } = req.params
    if (!await getRepository(Linha).findOne({ where: { id } })) {
      return res.status(404).json({ message: 'Line Not Found' })
    }
    await getRepository(Linha).delete(id)
      .then(() => res.status(200).send())
      .catch(err => res.status(500).send(err))
  }
}

export default new LinhaController()
