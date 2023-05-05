namespace API.Helpers
{

    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNum { get; set; } = 1;
        private int _pageSize = 10;

        public int PageSize
        {
            get => _pageSize;
            //will return 50 if the the page size is greater than 50 
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value; 
        }
        
        public string CurrentUsername { get; set; }
    
        public string Gender { get; set; }

        public int MinAge { get; set; } = 18;

        public int MaxAge { get; set; } = 100;

        public string OrderBy { get; set; } = "lastActive"; 
    }
    
   
}

