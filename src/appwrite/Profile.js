import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query, Avatars } from "appwrite"

export class ProfileService {
    Client = new Client()
    Avatar
    Databases
    bucket

    constructor() {
        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectid)
        this.Databases = new Databases(this.Client)
        this.bucket = new Storage(this.Client)
        this.Avatar = new  Avatars(this.Client)
    }

    async CreateProfile({title,Description,BannerImage,ProfileImage,UserID}){
        try {
            return await this.Databases.createDocument(
                conf.appwriteDatabaseid,
                conf.appwriteProfileCollectionid,
                title,
                {
                    Description,
                    BannerImage,
                    ProfileImage,
                    UserID
                }
            )
        } catch (error) {
            throw error
        }
    }

    async UpdateProfile(title,{Description,BannerImage,ProfileImage,UserID}){
        try {
            return await this.Databases.updateDocument(
                conf.appwriteDatabaseid,
                conf.appwriteProfileCollectionid,
                title,
                {
                    Description,
                    BannerImage,
                    ProfileImage,
                    UserID
                }
            )
        } catch (error) {
            throw error
        }
    }

    async  getProfile(title){
        try {
            return await this.Databases.getDocument(
                conf.appwriteDatabaseid,
                conf.appwriteProfileCollectionid,
                title
            ) 
               
            
        } catch (error) {
            return null
            throw error
        }
    }

    async uploadfile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteProfileBucketid,
                ID.unique(),
                 file
                
            ) 
               
            
        } catch (error) {
            throw error
        }
    }

    async deletefile(fileId){
        try {
             await this.bucket.deleteFile(
                conf.appwriteProfileBucketid,
                fileId
            ) 
            // console.log("image delete");
            return true
        } catch (error) {
            throw error
        }
    }

    getProfilePreview(fileId){
        const result =  this.bucket.getFilePreview( conf.appwriteProfileBucketid , fileId)
        // console.log(result);
        return result
    }

    // async Avatar(Url){
    //     try {
    //           this.Avatar.getImage(Url)
    //     } catch (error) {
    //         throw error
    //     }
    // }
}

const Profile = new ProfileService()
export default Profile