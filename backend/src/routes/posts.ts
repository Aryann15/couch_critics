import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

postRouter.use("/", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  const user = await verify(authHeader, c.env.SECRET);
  if (user) {
    //@ts-ignore
    c.set("userId", user.id);
    await next();
  }else {
    c.status(401)
    return c.json ({
      message: " you are not logged in "
    })
  }
});

postRouter.get("/", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId")
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const posts = await prisma.posts.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });
  return c.json({
    id: posts.id,
  });
});

postRouter.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const posts = await prisma.posts.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.text("message updated");
});


postRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const posts = await prisma.posts.findMany();
  return c.text("Hello from hono");
});


postRouter.get("/:id", async (c) => {
  const id =  c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const posts = await prisma.posts.findUnique({
    where: {
      id: id,
    },
  });
  return c.json({
    title: posts?.title,
    content: posts?.content,
  });
});
