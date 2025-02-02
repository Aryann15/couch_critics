import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import z from "zod";
import { signupInput, signinInput } from "aryantech-couchcritics-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(401);
    return c.json({
      message: "inputs are incorrect",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      },
    });
    console.log("hello");
    const jwt = await sign({ id: user.id }, c.env.SECRET);
    return c.json({ jwt });
  } catch (e) {
    c.status(411);
    return c.text("user already exsists");
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(401);
    return c.json({
      message: "inputs are incorrect",
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }
  const jwt = await sign({ id: user.id }, c.env.SECRET);
  return c.json({ jwt });
});
