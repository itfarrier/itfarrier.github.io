import { mkdir, writeFile } from 'fs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import inquirer from 'inquirer';

import { i18n } from '../data/i18n.js';

export default inquirer
  .prompt([
    {
      default() {
        return 'no-title';
      },
      message: 'Please, enter the post title:',
      name: 'postTitle',
      type: 'input',
    },
  ])
  .then((answers) => {
    const today = new Date();

    const todayISO = today.toISOString();

    const todayDate = todayISO.slice(0, 10);

    const todayTime = todayISO.slice(11, 19);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const postTitle: string = answers.postTitle;

    const titleWithDashes = postTitle.replace(/\s/gi, '-').toLowerCase();

    const newPostFolder = `${__dirname}/../pages/blog/${todayDate}-${titleWithDashes}`;

    mkdir(newPostFolder, (error) => {
      if (error !== null) {
        console.error('### mkdir error', error);
      }
    });

    i18n.languages.forEach((language) => {
      writeFile(
        `${newPostFolder}/index.${language}.md`,
        `---\ndate: ${todayDate} ${todayTime}\ntitle: '${postTitle}'\n---\n`,
        (error) => {
          if (error !== null) {
            console.error('### writeFile error', error);
          }
        },
      );
    });
  })
  .catch((error) => {
    console.error('### inquirer error', error);
  });
