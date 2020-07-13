import Router from 'koa-router';
import axios from './util/axios'

let router = new Router({
  prefix: '/classify'
})

router.get('/flList', async (ctx) => {
  let {
    status,
    data
  } = await axios.get('/main/flList')
  if (status === 200) {
    ctx.body = eval("(" + data + ")");
  }
})

export default router;
