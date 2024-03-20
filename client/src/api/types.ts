export type Post ={
	userId: number;
	text: string;
	id?:number;
}

export type User = {
	id: number;
	username:string;
	email:string;
	type:string;
}