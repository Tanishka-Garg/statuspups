import ResponseCodeList from "@models/list";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const list = await ResponseCodeList.findById({  creator: params.id }).populate("creator");
        if (!list) return new Response("List Not Found", { status: 404 });

        return new Response(JSON.stringify(list), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }
};

export const PATCH = async (request, { params }) => {
    const { name } = await request.json();

    try {
        await connectToDB();

        const existingList = await ResponseCodeList.findById(params.id);

        if (!existingList) {
            return new Response("List not found", { status: 404 });
        }

        existingList.name = name;

        await existingList.save();

        return new Response("Successfully updated the list", { status: 200 });
    } catch (error) {
        return new Response("Error Updating List", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
      await connectToDB();
  
      await ResponseCodeList.findByIdAndDelete(params.id);
  
      return new Response("List deleted successfully", { status: 200 });
    } catch (error) {
      console.error("Error deleting list:", error);
      return new Response("Error deleting list", { status: 500 });
    }
  };

