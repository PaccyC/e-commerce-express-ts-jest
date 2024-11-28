import { connectToDatabase,disconnectDatabase } from '../setup/testDatabase'
import app from '../../src/app';
import request from  'supertest';
import Category from '../../src/models/category';
import { CreateCategory, UpdateCategory } from '../../src/types/category';




const mockCategories = [
    { name: 'Category 1' },
    { name: 'Category 2' },
];


let server
beforeAll(async() => {
   await connectToDatabase();

   await Category.insertMany(mockCategories)
   server = app.listen();
})

afterAll(async() => {
    await Category.deleteMany();  
    await disconnectDatabase();
    server.close();
})

describe('GET /api/v1/category', () => {
    

    it('returns the list of categories', () => {
        request(app)
        .get("/api/v1/category")
        .set("Accept", 'application/json')
        .expect("Content-Type", 'application/json; charset=utf-8')
        .expect(200)
        .then((response)=>{
            expect(response.body).toHaveProperty("data")
            expect(Array.isArray(response.body.data)).toBe(true)
        })
    })
})


let id= "";


describe('POST /api/v1/category', () => {
    
    const newCategory:CreateCategory = {
        name: "My Category",
    }

    it('creates new Category and returns it ', async() => {
       await request(app)
        .post('/api/v1/category')
        .set("Content-Type", "application/json")
        .send(newCategory)
        .expect("Content-Type", "application/json; charset=utf-8") 
        .expect(200)
        .expect((response)=>{
            expect(response.body).toHaveProperty("data")
            expect(response.body.data).toHaveProperty("_id")
            id= response.body.data._id
            expect(response.body.data.name).toEqual("My Category")
        })}
    )})


describe('GET /api/v1/category/:id', () => {
    it('returns the category by ID', async() => {
        const response = await request(app).get(`/api/v1/category/${id}`)
        
        expect(response.statusCode)
        .toEqual(200)
        expect(response.body).toHaveProperty("data")
        expect(response.body.data.name).toEqual("My Category")
    })
})


describe('PUT /api/v1/category/edit/:id', () => {
    it('returns the updated category', async() => {

        const updatedCategory: UpdateCategory ={
            name:  "My Category Updated"
        }

         await request(app)
         .put(`/api/v1/category/edit/${id}`)
         .set("Content-Type", "application/json")
         .send(updatedCategory)
         .expect("Content-Type", "application/json; charset=utf-8")
         .expect(200)
         .expect((response)=>{
             expect(response.body).toHaveProperty("data")
             expect(response.body.data.name).toEqual("My Category Updated")
         })
        

        
    })
    
})


describe('DELETE /api/v1/category/delete/:id', () => {
    it('deletes the category by ID', async() => {
        const response=await request(app)
        .delete(`/api/v1/category/delete/${id}`)
        expect(response.statusCode).toEqual(200)
        
    })
    it("the category should not be accessible", async () => {
        const res = await request(app).delete(`/api/v1/category/delete/${id}`);
         expect(res.statusCode).toBe(404);
      });
    
})