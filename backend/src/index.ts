import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/user/signup", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });
    return c.text("user signed up");
  } catch (e) {
    c.status(411);
    return c.text("user already exsists");
  }
});

app.post("/api/v1/user/signin", (c) => {
  return c.text("Hello form sign in");
});

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
