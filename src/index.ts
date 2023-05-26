import express from 'express';
const app = express();
import expressSession from 'express-session';
import {PrismaSessionStore} from '@quixo3/prisma-session-store';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

app.use(
	expressSession({
		cookie: {
			maxAge: 7 * 24 * 60 * 60 * 1000, // Ms
		},
		secret: 'a santa at nasa',
		resave: true,
		saveUninitialized: true,
		store: new PrismaSessionStore(
			new PrismaClient(),
			{
				checkPeriod: 2 * 60 * 1000, // Ms
				dbRecordIdIsSessionId: true,
				dbRecordIdFunction: undefined,
			},
		),
	}),
);

app.use(express.json());

app.listen(8001, () => {
	console.log('App listening');
});
