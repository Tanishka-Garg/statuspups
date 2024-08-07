import ResponseCodeList from "@models/list";
import { connectToDB } from "@utils/database";
import { getSession } from "next-auth/react";


export const GET = async (request,  { params }) => {
  try {
      await connectToDB()

      const lists = await ResponseCodeList.find({  creator: params.id }).populate('creator')
      return new Response(JSON.stringify(lists), { status: 200 })
  } catch (error) {
  
      return new Response("Failed to fetch all lists", { status: 500 })
  }
} 