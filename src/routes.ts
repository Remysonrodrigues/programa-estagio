import { Router } from 'express'

import LinhaController from '@controllers/LinhaController'
import ParadaController from '@controllers/ParadaController'
import PosicaoVeiculoController from '@controllers/PosicaoVeiculoController'
import VeiculoController from '@controllers/VeiculoController'

const routes = Router()

routes.post('/linhas', LinhaController.create)
routes.get('/linhas', LinhaController.getAll)
routes.get('/linhas/:id', LinhaController.get)
routes.put('/linhas/:id', LinhaController.update)
routes.delete('/linhas/:id', LinhaController.remove)

export default routes
