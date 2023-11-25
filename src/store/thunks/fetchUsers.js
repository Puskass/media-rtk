import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pause } from "../../utils/pause";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3005/users");

  await pause(1000); //DEV ONLY!!
  return response.data;
});

export { fetchUsers };
