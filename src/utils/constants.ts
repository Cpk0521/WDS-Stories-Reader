export interface CategoryInfo {
    name: string;
    label: string;
}

export const CATEGORY_MAP : CategoryInfo[] = [
    { name: 'Main', label: 'メインストーリー' },
    { name: 'Event', label: 'イベントストーリー' },
    { name: 'Side', label: 'サイドストーリー' },
    { name: 'Spot', label: 'スポットストーリー' },
    { name: 'Poster', label: 'ポスターストーリー' },
    { name: 'Special', label: '限定ストーリー' },
    { name: 'Comic', label: 'コミック' },
]

export const CompanyMaster : {[key : number] : string} = {
    1 : "シリウス",
    2 : "Eden",
    3 : "銀河座",
    4 : "劇団電姫",
    5 : "最終章",
    999 : '序章',
    900 : 'ラブライブサンシャイン'
}

export const PosterType = {
    0 : '情報', 
    1 : '第一幕', 
    2 : '第二幕', 
    3 : '第三幕',
    4 : '第四幕',
    5 : 'アフタートーク',
    6 : 'シリウス',
    7 : 'Eden',
    8 : '銀河座',
    9 : '劇団電姫',
}