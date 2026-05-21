import { defineStore } from "pinia";
import type { EpisodeMasterData, ICharacterSideData, IComicData, IComicMasterData, IEventStoryData, IMainStoryData, IPosterData, ISpecialData, ISpotData, IStoryType, IStoryTypeReturn} from "../types/index";
import { EPISODE_MASTER_URL, COMIC_MASTER_URL } from "../config";

interface EpisodesState {
    fulldata: EpisodeMasterData | null,
    date : string,
    main: IMainStoryData[],
    event: IEventStoryData[],
    side: ICharacterSideData[],
    spot: ISpotData[],
    poster: IPosterData[],
    special: ISpecialData[],
    comic: IComicData[],
    loaded: boolean,
    error: Error | null
}
    
export const useMasterlistStore = defineStore("masterlist", {
    state: () : EpisodesState => ({
        fulldata: null,
        date: '',
        main: [],
        event: [],
        side: [],
        spot: [],
        poster: [],
        special: [],
        comic: [],
        loaded: false,
        error: null
    }),

    actions: {
        async loadMasterlist(): Promise<EpisodeMasterData | null> {
            if (this.loaded) {
                return this.fulldata;
            }

            try {
                const response = await fetch(EPISODE_MASTER_URL);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                const json: EpisodeMasterData = await response.json();
                this.fulldata = json;
                this.date = json.LatestDate;
                this.main = json.StoryMaster.Main;
                this.event = json.StoryMaster.Event;
                this.side = json.StoryMaster.Side;
                this.spot = json.StoryMaster.Spot;
                this.poster = json.StoryMaster.Poster;
                this.special = json.StoryMaster.Special;

                const comicResponse = await fetch(COMIC_MASTER_URL);
                if (!comicResponse.ok) {
                    throw new Error(`Comic HTTP ${comicResponse.status}`);
                }
                const comicData: IComicMasterData = await comicResponse.json();
                this.fulldata.StoryMaster.Comic = comicData;
                this.comic = comicData;

                this.loaded = true;

                return this.fulldata;
            } catch (error) {
                this.error = error as Error;
                console.error("Failed to load masterlist:", error);
                throw error;
            }
        },
        getDataByType(type: IStoryType): IStoryTypeReturn | null {
            if (!this.loaded || !this.fulldata) {
                return null;
            }

            switch (type) {
                case 'Main':
                    return this.main;
                case 'Event':
                    return this.event;
                case 'Side':
                    return this.side;
                case 'Spot':
                    return this.spot;
                case 'Poster':
                    return this.poster;
                case 'Special':
                    return this.special;
                case 'Comic':
                    return this.comic;
                default:
                    return null;
            }
        }
    }
});