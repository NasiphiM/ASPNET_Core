using System.Runtime.InteropServices;
using Microsoft.EntityFrameworkCore;

namespace API.Helpers
{
    public class PagedList<T> : List<T> // T:generic type : T accepts any type of  object
    {
        public PagedList(IEnumerable<T> items, int count, int pageNum, int pageSize)
        {
            CurrentPage = pageNum;
            TotalPages =  (int) Math.Ceiling(count / (double) pageSize);
            PagesSize = pageSize;
            TotalCount = count; 
            AddRange(items); 
        }
        public int CurrentPage { get; set; } 
        public int TotalPages { get; set; } 
        public int PagesSize { get; set; } 
        public int TotalCount { get; set; }
        //function that is only visible in same file name  
        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNum, int pageSize)
        {
            var count = await source.CountAsync(); //counts of items in query which is 10
            var items = await source.Skip((pageNum - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items, count, pageNum, pageSize);
        }
       
    }
}