import log from './logger.js';

import { document } from 'nodepub';

const createEpub = async (title, author, content) => {

    log('creating epub file')
    try {

        const metadata = {
            id: title,
            title,
            cover: 'output/cover.jpg',
            author,
            fileAs: author,
            language: 'bn',
            description: 'got from ebanglalibrary.com',
        };

        const epub = document(metadata);
        for (let chapter of content) {
            epub.addSection(chapter.title, chapter.data);
        }

        await epub.writeEPUB('./output/', title);
        log('exported successfully!');

    } catch (e) {
        console.log(e)
    }

}

export { createEpub };

