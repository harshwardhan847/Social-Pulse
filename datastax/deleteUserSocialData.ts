import { NextResponse } from "next/server";
import { instaDataCollection } from ".";

export const deleteUserSocialData = async (userId?: string) => {
  try {
    await instaDataCollection.deleteMany({ userId });
  } catch (error) {
    console.error("Error deleting user vector data:", error);
    return NextResponse.json({ error: "Failed to delete user vector data" });
  }
  return NextResponse.json({ message: "Data deleted successfully" });
};
