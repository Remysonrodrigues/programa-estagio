import { Router } from 'express'

import LinhaController from '@controllers/LinhaController'
import ParadaController from '@controllers/ParadaController'
import VeiculoController from '@controllers/VeiculoController'
import PosicaoVeiculoController from '@controllers/PosicaoVeiculoController'

const routes = Router()

routes.get('/linhas', LinhaController.getAll)
routes.get('/linhas/:id', LinhaController.get)
routes.post('/linhas', LinhaController.create)
routes.put('/linhas/:id', LinhaController.update)
routes.delete('/linhas/:id', LinhaController.remove)
routes.get('/linhas/veiculos/:id', LinhaController.veiculosPorLinha)

routes.get('/linhas/:linhaId/paradas', ParadaController.getAll)
routes.get('/linhas/:linhaId/paradas/:id', ParadaController.get)
routes.post('/linhas/:linhaId/paradas', ParadaController.create)
routes.put('/linhas/paradas/:id', ParadaController.update)
routes.delete('/linhas/paradas/:id', ParadaController.remove)
routes.get('/linhas/paradas/:id', ParadaController.linhasPorParada)

routes.get('/veiculos', VeiculoController.getAll)
routes.get('/veiculos/:id', VeiculoController.get)
routes.post('/veiculos', VeiculoController.create)
routes.put('/veiculos/:id', VeiculoController.update)
routes.delete('/veiculos/:id', VeiculoController.remove)

routes.get('/posicoes', PosicaoVeiculoController.getAll)
routes.get('/veiculos/:id/posicoes', PosicaoVeiculoController.get)
routes.post('/veiculos/:id/posicoes', PosicaoVeiculoController.create)
routes.put('/veiculos/:id/posicoes', PosicaoVeiculoController.update)
routes.delete('/veiculos/:id/posicoes', PosicaoVeiculoController.remove)

export default routes
