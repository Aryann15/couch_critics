import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/user/signup', (c) => {
  return c.text('hello from sign up route')
})

app.post('/api/v1/user/signin', (c)=>{
  return c.text('Hello form sign in')
})

app.post('/api/v1/post', (c)=> {
  return c.text ("Hello from posts section")
})

app.put('/api/v1/post', (c) =>{
  return c.text ('Hello from hono')
})

app.get('/api/v1/post/:id', (c) =>{
  return c.text ('Hello from hono')
})

app.get('/api/v1/post/bulk',(c) =>{
  return c.text ('Hello from hono')
})

export default app



