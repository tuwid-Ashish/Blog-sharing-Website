import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query, } from "appwrite";

export class StoreService {
    client = new Client()
    databases
    bucket
    

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectid)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async CreatePost({title,content,featuredImage,slug,userID,status}) {
        try {

            return await this.databases.createDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                // ID.unique(),
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    userID,
                    status,
                }
                

            )
        } catch (error) {
            throw error
        }
    
    }

    async UpdatePost(slug,{title,content,featuredImage,userID,status}){
        try {
           return await this.databases.updateDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug,  
                {
                    title,
                    content,
                    featuredImage,
                    userID,
                    status,
                }
            )
        } catch (error) {
            throw error
        }
    }

    async   DeletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug 
            ) 
              return true
            
        } catch (error) {
            throw error
        }
    }

    async  getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                slug 
            ) 
               
            
        } catch (error) {
            throw error
        }
    }

    async getposts(Queries = [Query.equal("Status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseid,
                conf.appwriteCollectionid,
                Queries,
                
            ) 
               
            
        } catch (error) {
            throw error
        }
    }

    async uploadfile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketid,
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
                conf.appwriteBucketid,
                fileId
            ) 
            // console.log("image delete");
            return true
        } catch (error) {
            throw error
        }
    }

    
      getfilePreview(fileId){
        try {
            const result =  this.bucket.getFilePreview( conf.appwriteBucketid , fileId)
            return result
        
        } catch (error) {
            return null
        }
        
    }
    
}

const Service = new StoreService()
export default Service