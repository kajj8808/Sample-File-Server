import multer from "multer";
import fs from "fs";
//
export async function upDateList({
  originalname,
  size,
  destination,
  fieldname,
  filename,
}) {
  let parsered_datas;
  try {
    const data = await fs.readFileSync(
      `${__dirname}/public/json/filelist.json`,
      "utf-8"
    );
    parsered_datas = JSON.parse(data);
  } catch (error) {
    parsered_datas = {};
  }

  parsered_datas[filename] = {
    originalname,
    size,
    destination,
    fieldname,
    filename,
  };
  await fs.writeFileSync(
    `${__dirname}/public/json/filelist.json`,
    JSON.stringify(parsered_datas)
  );
}

const makeFileName = (originalname) => {
  let extension = originalname.split(".");
  extension = extension[extension.length - 1];
  const file_name = `${String(new Date().getTime())}.${extension}`;
  return file_name;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/uploads");
  },
  filename: async function (req, file, cb) {
    cb(null, makeFileName(file.originalname));
  },
});

const upload = multer({ storage: storage });

export default upload;
