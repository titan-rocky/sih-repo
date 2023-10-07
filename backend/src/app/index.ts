import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

//Loading Environment Variables
dotenv.config();

// Express App instance
const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(cors());

app.get("/", (_, res: Response) => {
  res.send(
    "<html><head><title>Child Chronicles</title></head><body>backend api ready</body></html>",
  );
});

//Prisma Client
const prismaCl = new PrismaClient();

app.post("/login", async (req: Request, res: Response) => {
  const lid = await req.body;
  const data = await prismaCl.user
    .findUnique({
      where: {
        username: lid.username,
      },
    })
    .catch((e) => {
      console.log(e);
    });
  if (data === null) {
    res.status(400).send("User doesn't exist");
  } else if (data?.password !== lid.password) {
    res.status(400).send("Incorrect Password");
  } else {
    const result = {
      isValidLogin: true,
    };
    res.send(result);
  }
});

app.post("/createacc", async (req: Request, res: Response) => {
  const content = await req.body;
  const data = await prismaCl.user
    .findUnique({
      where: {
        username: content.username,
      },
    })
    .catch((e) => {
      console.log(e);
    });
  if (data !== null) {
    res.status(400).send("Username already exists");
  } else {
    await prismaCl.user.create({
      data: {
        username: content.username,
        password: content.password,
      },
    });
    res.send("User added successfully");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Starting at http://localhost:${process.env.PORT || 3000}`);
});
