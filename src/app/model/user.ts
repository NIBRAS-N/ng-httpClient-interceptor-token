export class User{
    constructor(
        public email: string,
        public id: string,
        private _token: string|null,
        private _expiresIn: Date
        // public _token: string|null,
        // public _expiresIn: Date
    ){
        
    }
    public get token(){
        if(!this._expiresIn || this._expiresIn < new Date()){
            return null;
        }
        return this._token;
    }
    public get exp(){
        return this._expiresIn; 
    }
}