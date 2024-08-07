import ResponseCodeList from "@models/list";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { userId, name, responseCodes } = await request.json();

  try {
    await connectToDB();
    const newList = new ResponseCodeList({ creator: userId, name, responseCodes });

    await newList.save();
    return new Response(JSON.stringify(newList), { status: 201 });
  } catch (error) {
    console.error('Error creating new list:', error);
    return new Response(`Failed to create a new list: ${error.message}`, { status: 500 });
  }
};
