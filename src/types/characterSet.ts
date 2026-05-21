export const characterSet = [
    {
      "Id": 101,
      "Name": "鳳ここな"
    },
    {
      "Id": 102,
      "Name": "静香"
    },
    {
      "Id": 103,
      "Name": "カトリナ・グリーベル"
    },
    {
      "Id": 104,
      "Name": "新妻八恵"
    },
    {
      "Id": 105,
      "Name": "柳場ぱんだ"
    },
    {
      "Id": 106,
      "Name": "流石知冴"
    },
    {
      "Id": 201,
      "Name": "連尺野初魅"
    },
    {
      "Id": 202,
      "Name": "烏森大黒"
    },
    {
      "Id": 203,
      "Name": "舎人仁花子"
    },
    {
      "Id": 204,
      "Name": "萬容"
    },
    {
      "Id": 205,
      "Name": "筆島しぐれ"
    },
    {
      "Id": 301,
      "Name": "千寿暦"
    },
    {
      "Id": 302,
      "Name": "ラモーナ・ウォルフ"
    },
    {
      "Id": 303,
      "Name": "王雪"
    },
    {
      "Id": 304,
      "Name": "リリヤ・クルトベイ"
    },
    {
      "Id": 305,
      "Name": "与那国緋花里"
    },
    {
      "Id": 401,
      "Name": "千寿いろは"
    },
    {
      "Id": 402,
      "Name": "白丸美兎"
    },
    {
      "Id": 403,
      "Name": "阿岐留カミラ"
    },
    {
      "Id": 404,
      "Name": "猫足蕾"
    },
    {
      "Id": 405,
      "Name": "本巣叶羽"
    }
];

export function getNameById(cId : number){ 
  return characterSet.find((char) => char.Id === cId)?.Name ?? ''
}