import auth from '../controllers/user'
import koaRouter from 'koa-router'
const router = koaRouter()

router.get('/user', auth.getUserInfo) // 定义url的参数是id
router.post('/user/login', auth.postUserAuth)

export default router
