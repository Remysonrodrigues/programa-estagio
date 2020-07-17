import { Router } from 'express'

import LinhaController from '@controllers/LinhaController'
import ParadaController from '@controllers/ParadaController'
import PosicaoVeiculoController from '@controllers/PosicaoVeiculoController'
import VeiculoController from '@controllers/VeiculoController'

const routes = Router()

routes.get('/linhas', LinhaController.getAll)
routes.get('/linhas/:id', LinhaController.get)
routes.post('/linhas', LinhaController.create)
routes.put('/linhas/:id', LinhaController.update)
routes.delete('/linhas/:id', LinhaController.remove)

routes.get('/linhas/:linhaId/paradas', ParadaController.getAll)
routes.get('/linhas/:linhaId/paradas/:id', ParadaController.get)
routes.post('/linhas/:linhaId/paradas', ParadaController.create)
routes.put('/linhas/paradas/:id', ParadaController.update)
routes.delete('/linhas/paradas/:id', ParadaController.remove)
routes.get('/linhas/paradas/:id', ParadaController.linhasPorParada)

export default routes
