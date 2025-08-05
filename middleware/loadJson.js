import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const loadJson = (fileNames = []) => {
    return (req, res, next) => {
        fileNames.forEach(fileName => {
            try{
                const filePath = path.join(__dirname, `../public/dynamicDatas/${fileName}.json`);
                const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                res.locals[fileName] = jsonData
            } catch (err) {
                console.error(`Error loading ${fileName}.json`, err)
                res.locals[fileName] = {}
            }
        });
        next();
    };
};

export default loadJson;