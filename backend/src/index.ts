import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET: string;
  };
}>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/user/signup", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    console.log("hello")
    const jwt = await sign({ id: user.id }, c.env.SECRET);
    return c.json ({jwt})
  } catch (e) {
    c.status(411);
    return c.text("user already exsists");
  }
});

app.post('/api/v1/user/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const user = await prisma.user.findUnique({
		where: {
			email: body.email
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

	const jwt = await sign({ id: user.id }, c.env.SECRET);
	return c.json({ jwt });
})

app.post("/api/v1/post", (c) => {
  return c.text("Hello from posts section");
});

app.put("/api/v1/post", (c) => {
  return c.text("Hello from hono");
});

app.get("/api/v1/post/:id", (c) => {
  return c.text("Hello from hono");
});

app.get("/api/v1/post/bulk", (c) => {
  return c.text("Hello from hono");
});

export default app;
