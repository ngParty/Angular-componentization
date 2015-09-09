declare const expect: Chai.ExpectStatic;

interface StringMap<K extends string,V>{
	[key:string]:V
}