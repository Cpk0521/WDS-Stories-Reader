export const EPISODE_MASTER_URL = 'https://raw.githubusercontent.com/wds-sirius/Adv-Resource/main/manifest/Episode.json'
export const COMIC_MASTER_URL = 'https://raw.githubusercontent.com/wds-sirius/Adv-Resource/main/manifest/Comic.json'

export const EPISODE_DATA_URL = 'https://raw.githubusercontent.com/wds-sirius/Adv-Resource/main'

export function getEpisodeDataUrl(episodeId : number) {
    return `${EPISODE_DATA_URL}/episode/${episodeId}.json`
}

export function getEpisodeVoicePackUrl(episodeId : number = 110011){
    return `${EPISODE_DATA_URL}/voice/${episodeId}.wds`
}

export function getComicDataUrl(filename : string) {
    return `${EPISODE_DATA_URL}/comic/${filename}.png`
}

export function getposterIconUrl(posterId : number) {
    return `${EPISODE_DATA_URL}/image/posterIcon/${posterId}.png`
}

export function geteventLogoUrl(eventId : number) {
    return `${EPISODE_DATA_URL}/image/eventLogo/logo_${eventId}.png`
}

export function getCardIconUrl(cardId : number){
    return `${EPISODE_DATA_URL}/image/cardIcon/${cardId}_0.png`
}
