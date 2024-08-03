import { getBookMetaData, getChapterContents } from './helperFuncs/getterHelper.js';
import { createEpub } from './helperFuncs/saverHelper.js';
import bookRouter from './routes/book-router.js';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express()

app.use('/', bookRouter)


// inputs, to be taken from requests
const url = 'https://www.ebanglalibrary.com/books/%e0%a7%a6%e0%a7%a6-%e0%a6%a6%e0%a7%87%e0%a7%9f%e0%a6%be%e0%a6%b2-%e0%a6%89%e0%a6%aa%e0%a6%a8%e0%a7%8d%e0%a6%af%e0%a6%be%e0%a6%b8%e0%a7%87%e0%a6%b0-%e0%a6%ad%e0%a7%82%e0%a6%ae%e0%a6%bf%e0%a6%95/';
const forcedAuthor = null;
const forcedTitle = null;



const startDo = async (url) => {
    const { bookTitle, author, chapterLinkList } = await getBookMetaData(url);

    const chapterContents = await getChapterContents(chapterLinkList);

    createEpub(forcedTitle ?? bookTitle, forcedAuthor ?? author, chapterContents);

}

startDo(url);

// const PORT = process.env.SERVER_PORT || 3005

// app.listen(PORT, () => {
//     console.log(`server be running at port ${PORT}`)
// })


