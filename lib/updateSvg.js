const fs = require("fs");

/**
 *  把一个数字转换为一个百分位数字字符串，eg：5转换为005，90转换为090
 * @param {*} num
 * @returns
 */
function transNumberToHundred(num) {
  if (num < 0 || num >= 1000) {
    return "0";
  } else if (num >= 0 && num < 10) {
    return `00${num}`;
  } else if (num >= 10 && num <= 100) {
    return `0${num}`;
  } else {
    return `${num}`;
  }
}

async function updateIconName() {
  const files = await fs.readdirSync("./svg/");
  const haveModifyFiles = files.filter(
    (file) => file.startsWith("uF") && file.endsWith(".svg")
  );
  const haveModifyFilesWithoutPrefix = haveModifyFiles.map(
    (file) => file.split("-")[1]
  );
  const modifyFileCodeList = haveModifyFiles.map((file) =>
    Number(file.split("-")[0].split("uF")[1])
  );
  /** 获取已经修改饿文件的最大编码 */
  let maxCode = 0;
  if (modifyFileCodeList.length > 0) {
    maxCode = Math.max(...modifyFileCodeList);
  }
  let unModifyFiles = files.filter(
    (file) => !file.startsWith("uF") && file.endsWith(".svg")
  );
  /** 删除名称重复文件 */
  const duplicateFiles = unModifyFiles.filter((file) =>
    haveModifyFilesWithoutPrefix.includes(file)
  );
  if (duplicateFiles.length > 0) {
    duplicateFiles.forEach((file) => {
      fs.unlinkSync(file);
    });
  }
  /** 批量重命名未修改的文件 */
  unModifyFiles = unModifyFiles.filter(
    (file) => !haveModifyFilesWithoutPrefix.includes(file)
  );
  unModifyFiles.forEach((file, index) => {
    const no = transNumberToHundred(maxCode + index + 1);
    const newName = `uF${no}-${file}`;
    fs.rename(`./svg/${file}`, `./svg/${newName}`, () => {});
  });
}

updateIconName();
