class BackendErrorHandle extends Error   //inheritted from deafult node class error
{
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode


    //inherited class can use the parent class methods
    Error.captureStackTrace(this, this.constructor)
    //first this means object ,  
  }
}

module.exports = BackendErrorHandle;


// class BackendErrorHandle extends Error {
//   constructor(message, statusCode) {
//     super(message);
//     this.statusCode = statusCode;
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// module.exports = BackendErrorHandle;
