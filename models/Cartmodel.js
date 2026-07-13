import mongoose from "mongoose";

const {Schema}=mongoose;

const CartmodelSchema = new Schema({

 userId:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"User",
   required:true
 },

 products:[          
  {
   productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product"
   },

   qty:{
    type:Number,
    default:1
   }
  }
 ]

},{timestamps:true})


const Cartmodel =
mongoose.models.Cartmodel || mongoose.model("Cartmodel",CartmodelSchema)


export default Cartmodel;