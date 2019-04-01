import role from '../controllers/role'
import koaRouter from 'koa-router'
const router = koaRouter()

router.get('/rolelist', role.getRoles)
router.post('/rolelist', role.getRoleById)
router.post('/createRole', role.createRole)
router.delete('/rolelist/:id', role.removeRole)
router.post('/updateRole/', role.updateRole)

export default router
