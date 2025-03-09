import mongoose from 'mongoose'
const userSchema=new mongoose.Schema(
    {
        _id:{type:String, required:true},
        name:{type:String, required:true},
        email:{type:String, required:true},
        imageUrl:{type:String, required:true},
        enrolledCourses:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Course'  //ref: 'Course' ka matlab hai ki yeh IDs Course collection se linked rahengi
            }
        ]

    },{timestamps:true} //timestamps: true ka matlab hai ki MongoDB automatically do extra fields add karega:createdAt: Document kab bana tha &&  updatedAt: Document kab last time update hua.
);
const User=mongoose.model('User',userSchema);
export default User;