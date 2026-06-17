export interface EpisodeMasterData {
  LatestDate : string,
  ScriptVersion : string,
  StoryMaster : IStoryMaster,
}

export type IStoryType = keyof IStoryMaster;
export type IStoryTypeReturn = IStoryMaster[IStoryType];

export type IComicMasterData = IComicData[];

export interface IStoryMaster {
    Main : IMainStoryData[],
    Event : IEventStoryData[],
    Side : ICharacterSideData[],
    Spot : ISpotData[],
    Poster : IPosterData[],
    Special : ISpecialData[],
    Comic? : IComicData[],
}

export interface IMainStoryData {
    Id : number,
    CompanyId : number,
    ChapterOrder : number,
    Episode : IEpisodeData[],
}

export interface IEventStoryData {
    Id : number,
    Title : string,
    Date : string, //YYYY-MM-DD
    Episode : IEpisodeData[],
}

export interface ICharacterSideData {
    Id : number,
    Name : string,
    CompanyMasterId : number,
    Groups : {
        Id : number,
        Title : string,
        Episode : IEpisodeData[],
    }[],
}

export interface ISpotData {
    EpisodeId : number,
    Title : string,
    Spot : string,
    CharacterIds : number[],
}

export interface IPosterData {
    Id : number,
    Name : string,
    PronounceName : string,
    CharacterIds : number[],
}

export interface ISpecialData {
    Id : number,
    Title : string,
    Episode : IEpisodeData[],
}

export interface IEpisodeData {
    EpisodeId : number,
    Title? : string,
    Order : number
}

export interface IComicData {
    id : number,
    title : string,
    filename : string,
}
