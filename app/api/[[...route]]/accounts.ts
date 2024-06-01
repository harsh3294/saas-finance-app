import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { and, eq, inArray } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json(
        {
          error: "Unauthorized",
        },
        401
      );
    }

    const data = await db
      .select({
        id: accounts.id,
        name: accounts.name,
      })
      .from(accounts)
      .where(eq(accounts.userId, auth.userId));

    return c.json({
      data,
    });
  })
  .post(
    "/",
    clerkMiddleware(),
    zValidator("json", insertAccountSchema.pick({ name: true })),
    async (c) => {
      const auth = await getAuth(c);

      if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

      const values = c.req.valid("json");

      // Additional server-side validation
      if (!values.name || values.name.trim() === "") {
        return c.json({ error: "Name cannot be empty or blank" }, 400);
      }

      // Check if account with the same name already exists
      const existingAccount = await db
        .select()
        .from(accounts)
        .where(
          and(eq(accounts.userId, auth.userId), eq(accounts.name, values.name))
        )
        .limit(1);

      if (existingAccount.length > 0) {
        return c.json({ error: "Account with this name already exists" }, 400);
      }

      const [data] = await db
        .insert(accounts)
        .values({
          id: createId(),
          userId: auth.userId,
          ...values,
        })
        .returning();

      return c.json({ data });
    }
  )
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      //Get user details
      const auth = getAuth(c);

      // Check if user is not logged in then return the user with 401
      if (!auth?.userId) {
        return c.json(
          {
            error: "Unauthorized",
          },
          401
        );
      }

      const values = c.req.valid("json");

      const data = await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            inArray(accounts.id, values.ids)
          )
        )
        .returning({
          id: accounts.id,
        });

      return c.json({ data });
    }
  );
export default app;
