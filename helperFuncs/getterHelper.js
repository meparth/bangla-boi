import get from 'axios';
import { load } from 'cheerio';
import log from './logger.js';
import { writeFile } from 'fs';


const getBookMetaData = async (url) => {
    const $ = await getCheerioObj(url);

    const bookTitle = getTitle($, '.wp-block-heading');
    const author = getAuthor($, '.entry-terms-authors a[rel="tag"]')
    let coverUrl = getCoverUrl($) ?? 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Gutenberg_Bible%2C_Lenox_Copy%2C_New_York_Public_Library%2C_2009._Pic_01.jpg';

    log('downloading cover image')
    await downloadCoverImg(coverUrl, 'output/cover.jpg');
    log('downloaded cover image');

    const listItems = $('.ld-item-name,.entry-title-link')
    let chapterLinkList = [];
    listItems.each((i, el) => {
        chapterLinkList.push($(el).attr('href'))
    });

    log(`Name of book and author: ${bookTitle}, ${author}`);
    log(`received ${chapterLinkList.length} links to chapters`);

    return { bookTitle, author, chapterLinkList };
}

const getTitle = ($, identifier) => {
    const bookHeaderEl = $(identifier).first();
    const bookTitle = bookHeaderEl.html();
    return bookTitle;
}

const getAuthor = ($, identifier) => {
    return $(identifier).text()
}

const getCoverUrl = ($) => {
    const coverUrl = $('.entry-image');
    return $(coverUrl).attr('src');
}


const getChapterContents = async (chapterLinkList) => {
    let chapterContents = [];
    for (let chapterUrl of chapterLinkList) {
        const content = await getChapterContentFromChapterUrl(chapterUrl);
        // console.log('content:: ', content)
        // setTimeout(() => log(`loading ${chapterUrl}`), 500)
        chapterContents.push(content)
    }

    return chapterContents;
}

const getChapterContentFromChapterUrl = async (chapterUrl) => {
    const $ = await getCheerioObj(chapterUrl);

    const title = getTitle($, 'h1');
    let data = getChapterText($);
    $('figure').remove();
    $('br').replaceWith('<p></p>');
    data = $(data).html();

    return { title, data };
}

const getChapterText = ($) => {
    const content = $('#ftwp-postcontent,.ld-tab-content,.entry-content');
    return content;
}

const downloadCoverImg = async (url, filename) => {
    const response = await get(url, { responseType: 'arraybuffer' });

    writeFile(filename, response.data, (err) => {
        if (err) throw err;
        log('Image downloaded successfully!');
    });
}


const getCheerioObj = async (url) => {
    try {
        const { data } = await get(url)
        return load(data);
    } catch (e) {

    }
}


export { getBookMetaData, getChapterContents }