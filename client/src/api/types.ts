export type Post ={
	userEmail: string;
	text: string;
	id?:number;
}

export type User = {
	id: number;
	username:string;
	email:string;
	type:string;
}