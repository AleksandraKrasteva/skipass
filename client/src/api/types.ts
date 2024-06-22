export type Post ={
	username: string;
	text: string;
	id?:number;
	journeyId?:number;
	reactions?: Reaction[];
}

export type User = {
	id: number;
	username:string;
	email:string;
	type:string;
}

export type Reaction = {
	id:number;
	postId:number;
	creator:string;
}

export type Journey={
	id:number;
	authorUsername: string;
	totalKm: number;
	fastest:number;
	slowest:number;
	date:Date;
	totalPasses: number;
	type: JourneyType;
}

export type JourneyType = 'FULL_DAY'| 'MORNING' | 'AFTERNOON' | 'NIGHT';