export interface IPosterModel {
    EpisodeId : number
    StoryType : typeof StoryTypes[keyof typeof StoryTypes]
    Title : string
    EpisodeDetail : IPosterUnit[]
}

export interface IPosterUnit {
    Id : number,
    EpisodeType: number,
    CharacterId: number,
    Description: string,
    Order: number,
    SpeakerName : string
}

// Episode
export interface IEpisodeModel {
    EpisodeId : number
    StoryType : typeof StoryTypes[keyof typeof StoryTypes]
    Order : number
    Prev : number | undefined | null
    Next : number | undefined | null
    Chapter : string
    Title : string
    EpisodeDetail : IEpisodeUnit[]
}

export type IEpisodeUnit = {
    Id : number
    EpisodeMasterId : number
    Title? : string
} & IEpisodeEffect &
    IEpisodeText &
    IEpisodeBackground &
    IEpisodeFade &
    IEpisodeSound &
    IEpisodeMovie &
    IEpisodeCharacter

export interface IEpisodeEffect {
    Effect? : string
    WindowEffect? : typeof WindowEffects[keyof typeof WindowEffects]
}

export interface IEpisodeText {
    Order : typeof NextOrderType[keyof typeof NextOrderType]
    GroupOrder : number
    SpeakerName? : string
    Phrase : string
    FontSize : typeof FontSizes[keyof typeof FontSizes]
    SpeakerIconId? : string
    TLSpeakerName? : string // for translation
    TLPhrase? : string // for translation
}

export interface IEpisodeBackground {
    BackgroundImageFileName? : string
    BackgroundCharacterImageFileName? : string
    StillPhotoFileName? : string
    SceneCameraMasterId? : number
}

export interface IEpisodeFade {
    BackgroundImageFileFadeType? : typeof FadeTypes[keyof typeof FadeTypes]
    FadeValue1? : number
    FadeValue2? : number
    FadeValue3? : number
}

export interface IEpisodeSound {
    BgmFileName? : string
    SeFileName? : string
    VoiceFileName? : string
}

export interface IEpisodeMovie {
    MovieFileName? : string
}

export interface IEpisodeCharacter {
    CharacterMotions : IEpisodeUnitCharacterMotion[]
}

export interface IEpisodeUnitCharacterMotion {
    slotNumber : number
    FacialExpressionMasterId? : number
    HeadMotionMasterId? : number
    HeadDirectionMasterId? : number
    BodyMotionMasterId? : number
    LipSyncMasterId? : number
    SpineId : number
    CharacterAppearanceType : typeof CharacterAppearanceTypes[keyof typeof CharacterAppearanceTypes]
    CharacterPosition : typeof CharacterPositions[keyof typeof CharacterPositions]
    CharacterLayerType : typeof CharacterLayerTypes[keyof typeof CharacterLayerTypes]
    SpineSize : typeof SpineSizes[keyof typeof SpineSizes]
}

export const StoryTypes = {
	Main : 1,
	Event : 2,
	Side : 3,
	Character : 4,
    Poster : 5,
    Special : 6
} as const;

export const NextOrderType = {
    Order : 1,
    GroupOrder : 2
} as const;

export const FadeTypes = {
	BlackFadeOutFadeIn : 1,
	WhiteFadeOutFadeIn : 2,
	TimeElapsed : 3,
	CrossFade : 4
} as const;

export const WindowEffects = {
	Sepia : 1,
	WhiteBlur : 2
} as const;

export const FontSizes = {
	Small : 1,
	Middle : 2,
	Large : 3
} as const;

export const SpineSizes = {
	Small : 1,
	Middle : 2,
	Large : 3
} as const;

export const CharacterAppearanceTypes = {
	FadeIn: 1,
	SlideInFromRight: 2,
	SlideInFromLeft: 3,
	SlideInFromBottom: 4
} as const;

export const CharacterLayerTypes = {
	None: 0,
	Layer1: 1,
	Layer2: 2,
	Layer3: 3
} as const;


export const CharacterPositions = {
	None: 0,
	OuterLeft: 1,  // 1920/2 - 495 ???
	InnerLeft: 2,  // 1920/2 -320
	Center: 3,     // 1920/2
	InnerRight: 4, // 1920/2 +320
	OuterRight: 5  // 1920/2 + 495 ???
} as const;