import { Hono } from "hono";

export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET: string;
  };
}>();

postRouter.get("/", (c) => {
  return c.text("Hello Hono!");
});

postRouter.post("/api/v1/post", (c) => {
  return c.text("Hello from posts section");
});

postRouter.put("/api/v1/post", (c) => {
  return c.text("Hello from hono");
});

postRouter.get("/api/v1/post/:id", (c) => {
  return c.text("Hello from hono");
});

postRouter.get("/api/v1/post/bulk", (c) => {
  return c.text("Hello from hono");
});
