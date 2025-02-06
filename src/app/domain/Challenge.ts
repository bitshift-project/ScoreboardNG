export interface Challenge{
    name: string;
    shortDescription: string;
    longDescription: string;
    points: number;
    challengeType: ChallengeType;
    projectId: number;
    challengeId: number;
    tags: Tag[];
}

export enum ChallengeType {
    Timed = "Timed",
    PointsOnly = "PointsOnly"
}

export interface Tag{
    challengeId: number;
    content: string;
    tagId: number;
}