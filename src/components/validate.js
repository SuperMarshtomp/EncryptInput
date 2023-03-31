export const passwordRule = `
密码规则：
1.长度为8-26个字符
2.有效字符为：字母、数字和英文下的特殊字符（除空格）
3.密码不能包含与账号相关的信息，不建议包含账号完整字符串、大小写变为或形似变换的字符串
4.密码不能使用连续3个及以上键位排序字符，如123，Qwe等
`;

let chains = [
  "1234567890-=",
  "qwertyuiop[]\\",
  "asdfghjkl;'",
  "zxcvbnm,./",
  "!@#$%^&*()_+"
];
chains = [...chains, ...chains.map(str => str.split('').reverse().join(''))]

const chainInclude = function(pwd) {
  if (!pwd) return false;

  const nPice = 3;
  if (pwd.length < nPice) return false;

  pwd = pwd.toLowerCase();
  for (let i = 0, n = pwd.length; i <= n - 3; i++) {
    const pice = pwd.substring(i, i + 3);
    const chain = chains.find(t => t.includes(pice));
    if (chain) return true;
  }
  return false;
};

export const validateLength = (rule, value, callback) => {
  if (!/^.{8,26}$/.test(value)) {
    callback(new Error("8-26位，须同时包含英文字母、数字和特殊字符"));
  } else {
    callback();
  }
};

export const validateWord = (rule, value, callback) => {
  if (!/^[A-Za-z0-9~!@#$%^&*()_\+\-{\[\]}|\\;:,.'"?/<>`=]+$/.test(value)) {
    callback(new Error("有效字符为：字母、数字和英文下的特殊字符（除空格）"));
  } else {
    callback();
  }
};

export const validatePass = (rule, value, callback) => {
  var matchNum = 0;
  ["[A-Za-z]", "[0-9]"].forEach(str => {
    if (new RegExp(str).test(value)) matchNum++;
  });
  if (/[~!@#$%^&*()_\+{\[\]}|\\;:,.'"?/<>]/.test(value)) {
    matchNum++;
  }
  if (matchNum < 3) {
    callback(new Error(`须同时包含英文字母、数字和特殊字符`));
  } else {
    callback();
  }
};

export const validateContinuation = (rule, value, callback) => {
  if (chainInclude(value)) {
    callback(
      new Error(`密码中不能使用连续3个及以上键位排序字符，如123，Qwe等`)
    );
  } else {
    callback();
  }
};

//判断是否今天过期（两个时间戳年-月-日是否相等）
export const isDeadline = function(expireDate, nowDate) {
  let expireTime = new Date(expireDate);
  let nowTime = nowDate ? new Date(nowDate) : new Date();
  const t_expire = new Date(
    `${expireTime.getFullYear()}/${expireTime.getMonth()}/${expireTime.getDate()}`
  );
  const t_now = new Date(
    `${nowTime.getFullYear()}/${nowTime.getMonth()}/${nowTime.getDate()}`
  );
  return t_now.getTime() >= t_expire.getTime();
};

export const assertTimeSpan = function(startDate, endDate, assertValue) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return end - start > assertValue;
};

export default [
  {
    validator: validateLength,
    trigger: ["blur", "change"],
    message: "长度为8-26个字符"
  },
  {
    validator: validateWord,
    trigger: ["blur", "change"],
    message: "有效字符为：字母、数字和英文下的特殊字符（除空格）"
  },
  {
    validator: validatePass,
    trigger: ["blur", "change"],
    message: "须同时包含英文字母、数字和特殊字符"
  },
  {
    validator: validateContinuation,
    trigger: ["blur", "change"],
    message: "密码不能使用连续3个及以上键位排序字符，如123，Qwe等"
  }
];
