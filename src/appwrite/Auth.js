import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class Authservice {
    client = new Client()
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectid)
        this.account = new Account(this.client)
    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // make a login
                return this.Login({ email, password })
            }
            else return userAccount
        } catch (error) {
            throw error
        }
    }

    async Login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
             console.log(error);
        }

        return null;
    }

    async Logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

export const authService = new Authservice()

export default authService
