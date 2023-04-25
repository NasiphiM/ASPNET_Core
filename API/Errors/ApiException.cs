namespace API.Errors
{

    public class ApiException
    {
        //contains respnse to the client 

        public ApiException(int statCode, string message, string dets)
        {
            StatusCode = statCode;
            Message = message;
            Details = dets; 
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }
        
        public string Details { get; set; }
    }
}