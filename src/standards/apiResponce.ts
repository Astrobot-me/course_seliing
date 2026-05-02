export class ApiResponse {
  status: number;
  message: string;
  data: any;
  error: any;
  constructor(
    status: number,
    message: string,
    data: any = null,
    error: any = null,
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  toJSON() {
    return {
      status: this.status,
      message: this.message,
      data: this.data,
      // error: this.error,
      ...(process.env.NODE_ENV !== "production" && { error: this.error }),
    };
  }
}

/*
where im caalong toJson10:21 PMYou're not calling it anywhere — and you don't need to.
When you pass an ApiResponse instance to res.json(), Express automatically calls .toJSON() under the hood (it's part of how JSON.stringify works in JS).
res.json(new ApiResponse(200, "User fetched", user))
// Express sees it's an object → calls JSON.stringify()
// JSON.stringify() automatically calls .toJSON() if it exists ✅
So you get the plain object shape in the response without ever manually calling .toJSON().

If you don't add toJSON(), it still works fine too — JSON.stringify will just serialize all the class properties directly, which gives the same result in your case since all fields are public. The toJSON() method only becomes useful if you want to control or filter what gets serialized, e.g.:


*/
